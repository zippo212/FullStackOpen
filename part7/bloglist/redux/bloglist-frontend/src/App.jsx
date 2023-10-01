import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logoutUser, persistUser } from './reducers/userReducer'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(persistUser())
  }, [dispatch])

  return (
    <div>
      <h2>{user ? 'Blogs' : 'Login to application'}</h2>
      <Notification />
      {!user ? (
        <LoginForm />
      ) : (
        <>
          <p>
            <span>{`${user.name} logged in`}</span>
            <button onClick={() => dispatch(logoutUser())}>logout</button>
          </p>
          <NewBlogForm />
          <div id="blogs-container">
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} user={user} />
              ))}
          </div>
        </>
      )}
    </div>
  )
}

export default App
