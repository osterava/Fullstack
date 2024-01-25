import React from 'react'

const Notification = ({ message, type }) => {
    const successStyle = {
      color: 'green',
      background: 'lightgrey',
      font: '20p',
      borderStyle: 'solid',
      borderRadius: '5',
      padding: '10',
      margin: '10'
    }
  
    const errorStyle = {
      color: 'red',
      background: 'lightgrey',
      font: '20p',
      borderStyle: 'solid',
      borderRadius: '5',
      padding: '10',
      margin: '10'
    }
  
    if (message === null) {
      return null
    } else if (type === 'error') {
      console.log('Error!')
      return (
        <div style={errorStyle}>
          {message}
        </div>
      )
    } else {
      return (
        <div style={successStyle}>
          {message}
        </div>
      )
    }
  }

  export default Notification