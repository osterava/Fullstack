import { useState } from 'react'

export const NewBlog = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const resetNewBlogFields = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })
    resetNewBlogFields()
  }

  return (
    <div>
      <form onSubmit={addNewBlog}>
        <p>
          <label>
          Title:
            <input
              type='text'
              value={title}
              onChange={handleTitleChange}
            />
          </label>
        </p>
        <p>
          <label>
          Author:
            <input
              type='text'
              value={author}
              onChange={handleAuthorChange}
            />
          </label>
        </p>
        <p>
          <label>
          URL:
            <input
              type='text'
              value={url}
              onChange={handleUrlChange}
            />
          </label>
        </p>
        <button type="submit">Create a new blog</button>
      </form>
    </div>
  )
}