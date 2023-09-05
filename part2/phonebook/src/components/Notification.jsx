const Notification = ({success, error}) => {
  const message = success || error
  if (!message) return  
  
  const color = success ? 'green' : 'red';
  const notificationStyle = {
    color: `${color}`,
    padding: 10,
    fontSize: 20,
    fontWeight: 700,
    background: 'lightgrey',
    marginBottom: 10,
    borderRadius: 8,
    border: `medium dashed ${color}`
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification