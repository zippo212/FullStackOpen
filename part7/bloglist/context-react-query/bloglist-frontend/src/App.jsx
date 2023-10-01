import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import { useNotificationValue, useSetNotification } from './NotificationReducer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useUserDispatch, useUserValue } from './UserReducer'

const Notification = () => {
  const message = useNotificationValue()

  if (!message) return

  const color = message.type ? 'green' : 'red'
  const notificationStyle = {
    color: `${color}`,
    padding: 10,
    fontSize: 20,
    fontWeight: 700,
    background: 'lightgrey',
    marginBottom: 10,
    borderRadius: 8,
    border: `medium dashed ${color}`,
  }

  return (
    <div style={notificationStyle} data-notification>
      {message.content}
    </div>
  )
}

const App = () => {
  const queryClient = useQueryClient()
  const user = useUserValue()
  const loginDispatch = useUserDispatch()
  const setNotification = useSetNotification()

  const createMutation = useMutation(blogService.createBlog, {
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] }),
        setNotification({ type: true, content: `blog '${blog.title}' created successfully` })
    },
    onError: (err) => {
      setNotification({ type: false, content: err.response.data.error })
    },
  })

  const updateMutation = useMutation(blogService.update, {
    onSuccess: (blog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] }),
        setNotification({ type: true, content: `blog '${blog.title}' liked successfully` })
    },
    onError: (err) => {
      setNotification({ type: false, content: err.response.data.error })
    },
  })

  const query = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll, retry: 1 })
  const blogs = query.data

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setUpToken(user.token)
      loginDispatch({ type: 'PERSIST', payload: user })
    }
  }, [])

  const updateUser = (user) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setUpToken(user.token)
    loginDispatch({ type: 'LOGIN', payload: user })
    setNotification({
      type: true,
      content: `${user.name} logged in successfully`,
    })
  }

  const updateBlogs = async (newBlog) => {
    try {
      createMutation.mutate(newBlog)
    } catch (err) {
      setNotification({ type: false, content: err.response.data.error })
    }
  }

  const updateLike = async (updatedBlogData) => {
    try {
      updateMutation.mutate(updatedBlogData)
    } catch (err) {
      setNotification({ type: false, content: err.response.data.error })
    }
  }

  const handleError = (err) => {
    setNotification({ type: false, content: err })
  }

  const handleLogOut = () => {
    localStorage.removeItem('loggedBlogAppUser')
    blogService.setUpToken(null)
    loginDispatch({ type: 'LOGOUT' })
  }

  if (query.status === 'error') {
    return <p>anecdote service not available due to problems in server</p>
  }

  return (
    <div>
      <h2>{user ? 'Blogs' : 'Login to application'}</h2>
      <Notification />
      {!user ? (
        <LoginForm updateUser={updateUser} handleError={handleError} />
      ) : (
        <>
          <p>
            <span>{`${user.name} logged in`}</span>
            <button onClick={handleLogOut}>logout</button>
          </p>
          <NewBlogForm updateBlogs={updateBlogs} handleError={handleError} />
          <div id="blogs-container">
            {blogs
              ?.sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} handleError={handleError} updateLike={updateLike} />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
