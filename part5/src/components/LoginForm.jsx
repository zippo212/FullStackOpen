import { useState } from "react"
import { login } from "../services/login"

const LoginForm = ({updateUser,handleError}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {setUsername(""),setPassword("")}
  
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({username, password}) 
      updateUser(user)
      resetForm()
    } catch (err) {
      handleError(err.response.data.error)
      resetForm()
    }
    // try to login
  }

  return (
    <form onSubmit={handleLogin}>
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