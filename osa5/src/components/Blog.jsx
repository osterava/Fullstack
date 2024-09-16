import { useState } from 'react'

export const Blog = ({ blog }) => {

  const [showDetails, setDetailsShown] = useState(false)
  const showBlogDetails = () => setDetailsShown(!showDetails)

  const blogStyle = {
    borderRadius: '10px',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    fontSize: '16px',
  }

  const BlogDetail = ({ blog }) => {
    return (
      <div>
        <p> <b>Author: </b> {blog.author} </p>
        <p> <b>Url: </b> <a href={blog.url}> {blog.url} </a> </p>
        <p> <b>Likes: </b> {blog.likes} </p>
        <p> <b>Added by user: </b> {blog.user.name} </p>

      </div>
    )
  }
  return (
    <div style={blogStyle} >
      {blog.title} <button onClick={showBlogDetails}>view</button>
      {showDetails && <BlogDetail key={blog.title} blog={blog} />}
    </div >
  )
}
