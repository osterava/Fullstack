import { useEffect, useState, useRef } from 'react'
import { Blog } from './components/Blog'
import { LoginForm } from './components/LoginForm'
import { NewBlog } from './components/NewBlog'
import { ErrorNotification, SuccessNotification } from './components/notifications'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const userLogin = (user) => {
    loginService
      .login(user)
      .then(loginUser => {
        setUser(loginUser)
        blogService.setToken(loginUser.token)
        window.localStorage.setItem(
          'loggedBloglistUser', JSON.stringify(loginUser)
        )
        showSuccessMessage(`${loginUser.name} logged in`)
      })
      .catch(error => {
        showErrorMessage('wrong password or username')
      })
  }

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => {
        const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedBlogs)
      })
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
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
    setUser(null)
  }

  const UserLoginForm = () => (
    <div>
      <LoginForm userLogin={userLogin} />
    </div>
  )

  const addLike = async (blogId) => {
    try {
      const blogToUpdate = await blogService.getBlogById(blogId)
      blogToUpdate.likes += 1
      const returnedBlog = await blogService.updateLike(blogId, blogToUpdate)
      setBlogs(blogs.map(blog =>
        blog.id === blogId ? { ...blog, likes: returnedBlog.likes } : blog
      ))
      showSuccessMessage('You liked a blog')
    } catch (error) {
      console.log('Something went wrong:', error)
    }
  }

  const NewBlogsRef = useRef()

  const addBlog = (addNewBlog) => {
    NewBlogsRef.current.toggleVisibility()
    blogService
      .create(addNewBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
        showSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
      .catch(error => {
        showErrorMessage('sorry, a new blog post has not been added')
      })
  }

  const deleteBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(blogId)
        setBlogs(blogs.filter(blog => blog.id !== blogId))
        showSuccessMessage('Blog deleted')
      } catch (error) {
        console.log('Something went wrong, blog could not be deleted', error)
        showErrorMessage('Blog could not be deleted')
      }
    }
  }

  const loggedinUser = () => (
    <div>
      <p>{user.name} logged in</p>
      <p><button onClick={handleLogOut}>logout</button></p>
    </div>
  )

  const newBlogForm = () => (
    <div>
      {loggedinUser()}
      <Togglable buttonLabel='Add a new blog' ref={NewBlogsRef}>
        <NewBlog addBlog={addBlog} />
      </Togglable>

      <h3>All blogs</h3>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} user={user} onDelete={deleteBlog} onLike = {addLike} />
      ))}
    </div>
  )

  return (
    <div>
      <h2>Blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      {user === null ? (
        <UserLoginForm />
      ) : (
        newBlogForm()
      )}
    </div>
  )
}

export default App
