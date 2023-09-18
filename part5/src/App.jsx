import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )  
  // }, [])

  const updateUser = async (user) => {
    blogService.setUpToken(user.token)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setUser(user)
  }

  const handleError = (err) => {
    setError(err)
  }

  return (
    <div>
      <h2>{user ? "Blogs" : "Log in to application"}</h2>
      {!user 
        ? <LoginForm updateUser={updateUser} handleError={handleError}/>
        : <> 
            <p>{`${user.name} logged in`}</p>
            {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
          </>
      }

    </div>
  )
}

export default App