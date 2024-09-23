import { useState, useEffect } from 'react'

export const Blog = ({ blog, user, onDelete, onLike }) => {
  const [showDetails, setDetailsShown] = useState(false)
  const [userIsBlogOwner, setBlogOwner] = useState(false)

  const showBlogDetails = () => setDetailsShown(!showDetails)

  useEffect(() => {
    setBlogOwner(user && user.username === blog.user.username)
  }, [user, blog.user.username])

  const handleLike = () => {
    onLike(blog.id)
  }

  const removeBlog = () => {
    onDelete(blog.id)
  }

  const BlogDetail = () => (
    <div>
      <p><b>Author:</b> {blog.author}</p>
      <p><b>Url:</b> <a href={blog.url}>{blog.url}</a></p>
      <p><b>Likes:</b> {blog.likes} <button onClick={handleLike}>like</button></p>
      <p><b>Added by user:</b> {blog.user.name}</p>
      {userIsBlogOwner && (
        <p><b>Remove blog:</b> <button onClick={removeBlog}>remove</button></p>
      )}
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={showBlogDetails}>view</button>
        {showDetails && <BlogDetail />}
      </div>
    </div>
  )
}
