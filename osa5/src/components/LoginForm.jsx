import { useState } from 'react'
import PropTypes from 'prop-types'


export const LoginForm = ({ userLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const login = (event) => {
    event.preventDefault()

    userLogin({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }


LoginForm.propTypes = {
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

  return (
    <div>
      <h2>Login to the blog application</h2>
      <form onSubmit={login}>
        <p>
        username:
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange} />
        </p>
        <p>
        password:
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </p>
        <p>
          <button type='submit'>login</button>
        </p>
      </form>
    </div>
  )
}
