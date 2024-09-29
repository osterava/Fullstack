import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, dispatch] = useReducer(notificationReducer, null)

  const showNotification = (message) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: message,
    })

    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useNotification = () => {
  return useContext(NotificationContext)
}

export default NotificationContext