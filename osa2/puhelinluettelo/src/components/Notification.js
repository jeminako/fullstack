import React from 'react'

const Notification = ({ message, type }) => {
  let notificationStyle = {
    fontSize: 20,
    border: '2px solid blue',
    padding: '5px',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#e6f2ff'
  }

  if (type === 1) {
    notificationStyle = {
      ...notificationStyle,
      border: '2px solid red',
      backgroundColor: '#ffe6e6'
    }
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification