import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setupUserLogin } from '../reducers/userReducer'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
        <Input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <Input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button type="submit">login</Button>
    </form>
  )
}

export default LoginForm
