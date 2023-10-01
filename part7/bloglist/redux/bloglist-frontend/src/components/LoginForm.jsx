import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setupUserLogin } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setUsername(''), setPassword('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(setupUserLogin({ username, password }))
      resetForm()
    } catch (err) {
      dispatch(setNotification({ type: false, message: err }))
      resetForm()
    }
  }

  return (
    <form onSubmit={handleLogin} id="login-form">
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
