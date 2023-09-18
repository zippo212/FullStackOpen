import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)

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

  const updateUser = async (user) => {
    localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
    blogService.setUpToken(user.token)
    setUser(user)
  }

  const handleError = (err) => {
    setError(err)
  }

  const handleLogOut = () => {
    localStorage.removeItem('loggedBlogAppUser')
    blogService.setUpToken(null)
    setUser(null)
  }

  return (
    <div>
      <h2>{user ? "Blogs" : "Log in to application"}</h2>
      {!user 
        ? <LoginForm updateUser={updateUser} handleError={handleError}/>
        : <> 
            <p>
              <span>{`${user.name} logged in`}</span>
              <button onClick={handleLogOut}>logout</button>
            </p>
            {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
          </>
      }

    </div>
  )
}

export default App