import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  if (!notification.message) return
  const type = notification.type

  const color = type ? 'green' : 'red'
  const notificationStyle = {
    color: `${color}`,
    padding: 10,
    fontSize: 20,
    fontWeight: 700,
    background: 'lightgrey',
    marginBottom: 10,
    borderRadius: 8,
    border: `medium dashed ${color}`,
  }
  return (
    <div style={notificationStyle} data-notification>
      {notification.message}
    </div>
  )
}

export default Notification
