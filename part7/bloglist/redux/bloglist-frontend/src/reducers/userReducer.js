import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { login } from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = userReducer.actions

export const setupUserLogin = (credentials) => {
  return async (dispatch) => {
    const loggedInUser = await login(credentials)
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(loggedInUser))
    blogService.setUpToken(loggedInUser.token)
    dispatch(setUser(loggedInUser))
    dispatch(
      setNotification({ type: true, message: `${loggedInUser.name} logged in successfully` })
    )
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('loggedBlogAppUser')
    blogService.setUpToken(null)
    dispatch(removeUser())
  }
}

export const persistUser = () => {
  return (dispatch) => {
    const loggedUser = localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setUpToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export default userReducer.reducer
