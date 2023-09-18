import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const Notification = ({success, error}) => {
  const message = success || error
  if (!message) return  
  
  const color = success ? 'green' : 'red';
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

  const updateUser = (user) => {
    localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
    blogService.setUpToken(user.token)
    setUser(user)
    setSuccessMessage(`${user.name} logged in successfully`)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const updateBlogs = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const handleError = (err) => {
    setErrorMessage(err)
    setTimeout(() => setErrorMessage(null), 3000)
  }

  const handleLogOut = () => {
    localStorage.removeItem('loggedBlogAppUser')
    blogService.setUpToken(null)
    setUser(null)
  }

  return (
    <div>
      <h2>{user ? "Blogs" : "Login to application"}</h2>
      <Notification success={successMessage} error={errorMessage}/> 
      {!user 
        ? <LoginForm updateUser={updateUser} handleError={handleError}/>
        : <> 
            <p>
              <span>{`${user.name} logged in`}</span>
              <button onClick={handleLogOut}>logout</button>
            </p>
            <NewBlogForm updateBlogs={updateBlogs} handleError={handleError}/>
            {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
          </>
      }

    </div>
  )
}

export default App