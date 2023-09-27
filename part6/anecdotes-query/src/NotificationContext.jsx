import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW": 
      return action.payload
    case "RESET": 
      return '' 
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const useSetNotification = () => {
  const dispatch = useNotificationDispatch()
  return (message) => {
    dispatch({ type: "SHOW", payload: message })
    setTimeout(() => dispatch({type: "RESET"}), 5000)
  }
}

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
} 

export default NotificationContext