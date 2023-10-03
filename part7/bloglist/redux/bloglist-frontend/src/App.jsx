import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { persistUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import { getUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import Nav from './components/Nav'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(persistUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <Nav />
      <Notification />
      {!user ? (
        <LoginForm />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
        </Routes>
      )}
    </div>
  )
}

export default App
