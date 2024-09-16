import { useState } from 'react'

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
