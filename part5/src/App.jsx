import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const Notification = ({ success, error }) => {
  const message = success || error
  if (!message) return

  const color = success ? 'green' : 'red'
  const notificationStyle = {
    color: `${color}`,
    padding: 10,
    fontSize: 20,
    fontWeight: 700,
    background: 'lightgrey',
    marginBottom: 10,
    borderRadius: 8,
    border: `medium dashed ${color}`
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setUpToken(user.token)
      setUser(user)
    }
  }, [])

  const resetNotifications = () => {
    setTimeout(() => {
      setSuccessMessage(null)
      setErrorMessage(null)
    },3000)
  }

  const updateUser = (user) => {
    localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
    blogService.setUpToken(user.token)
    setUser(user)
    setSuccessMessage(`${user.name} logged in successfully`)
    resetNotifications()
  }

  const updateBlogs = async (newBlog) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(createdBlog))
      setSuccessMessage(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
      resetNotifications()
    } catch (err) {
      setErrorMessage(err.response.data.error)
      resetNotifications()
    }
  }

  const removeBlogs = (id) => {
    setBlogs(blogs.filter(b => b.id !== id))
    setSuccessMessage('blog was removed successfully')
    resetNotifications()
  }

  const updateLike = async (updatedBlogData, id) => {
    try {
      const response = await blogService.update(updatedBlogData, id)
      setBlogs(blogs.map(b => b.id !== id ? b : response))
    } catch (err) {
      setErrorMessage(err.response.data.error)
      resetNotifications()
    }
  }

  const handleError = (err) => {
    setErrorMessage(err)
    resetNotifications()
  }

  const handleLogOut = () => {
    localStorage.removeItem('loggedBlogAppUser')
    blogService.setUpToken(null)
    setUser(null)
  }

  return (
    <div>
      <h2>{user ? 'Blogs' : 'Login to application'}</h2>
      <Notification success={successMessage} error={errorMessage}/>
      {!user
        ? <LoginForm updateUser={updateUser} handleError={handleError}/>
        : <>
          <p>
            <span>{`${user.name} logged in`}</span>
            <button onClick={handleLogOut}>logout</button>
          </p>
          <NewBlogForm updateBlogs={updateBlogs} handleError={handleError}/>
          {blogs
            .sort((a,b) => b.likes - a.likes)
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleError={handleError}
                removeBlogs={removeBlogs}
                updateLike={updateLike}
                user={user}
              />
            )}
        </>
      }

    </div>
  )
}

export default App