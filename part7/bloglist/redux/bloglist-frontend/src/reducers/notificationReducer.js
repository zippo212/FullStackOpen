import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    type: null,
    message: null,
    timeoutId: null,
  },
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    resetMessage(state, action) {
      return {
        type: null,
        message: null,
        timeoutId: null,
      }
    },
    setTimeoutId(state, action) {
      return {
        ...state,
        timeoutId: action.payload,
      }
    },
  },
})

const { setMessage, resetMessage, setTimeoutId } = notificationSlice.actions

export const setNotification = (message) => {
  return (dispatch, getState) => {
    const state = getState()
    const existingTimeoutId = state.notification.timeoutId
    if (existingTimeoutId) {
      clearTimeout(existingTimeoutId)
    }
    dispatch(setMessage(message))
    const newTimeoutId = setTimeout(() => dispatch(resetMessage()), 5000)
    dispatch(setTimeoutId(newTimeoutId))
  }
}

export default notificationSlice.reducer
