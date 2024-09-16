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
        title:
          <input
            type='text'
            value={title}
            onChange={handleTitleChange}
          />
        </p>
        <p>
        author:
          <input
            type='text'
            value={author}
            onChange={handleAuthorChange}
          />
        </p>
        <p>
        url:
          <input
            type='text'
            value={url}
            onChange={handleUrlChange}
          />
        </p>
        <button type="submit">create a new blog</button>
      </form>

    </div>
  )
}