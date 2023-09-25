import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    resetMessage(state, action) {
      return ''
    },
  },
})

export const { setMessage, resetMessage } = notificationSlice.actions

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => dispatch(resetMessage()), time * 1000)
  }
}

export default notificationSlice.reducer
