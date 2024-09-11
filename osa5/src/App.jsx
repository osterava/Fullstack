import { useEffect, useState } from 'react'
import { Blog } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { ErrorNotification, SuccessNotification } from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      resetNewBlogFields()
      showSuccessMessage(`${user.name} logged in`)
    } catch (exception) {
      showErrorMessage('Invalid username or password')
  }
}

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }, [user])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  const showErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
      blogService.setToken(null)
      resetNewBlogFields()
      setUser(null)
  
  }

  const resetNewBlogFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    setUsername('')
    setPassword('')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

      if (!title || !author || !url) {
      showErrorMessage('Error: All fields (title, author, and url) must be filled out')
      return
    }

    const newBlogPost= {
      title: title,
      author: author,
      url: url
    }

    try {
      const createdBlog = await blogService.create(newBlogPost)
      setBlogs(blogs.concat(createdBlog)) 
      showSuccessMessage(`A new blog "${createdBlog.title}" by ${createdBlog.author} added`)
    } catch (error) {
      showErrorMessage('Error: Could not create a new blog ' + user.token)
}
}

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage} />
       <SuccessNotification message={successMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <p>{user.name} logged in <button onClick={handleLogOut}> log out</button></p> 
      <h2>Create a new blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title:
            <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          </div>
          <div>
            url:
            <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          </div>
          <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  }

export default App
