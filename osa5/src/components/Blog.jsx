import { useState, useEffect } from 'react';
import blogService from '../services/blogs';

export const Blog = ({ blog, user, onDelete }) => {
  const [showDetails, setDetailsShown] = useState(false);
  const [updatedLikes, setLikes] = useState(blog.likes);
  const [userIsBlogOwner, setBlogOwner] = useState(false);

  const showBlogDetails = () => setDetailsShown(!showDetails);

  useEffect(() => {
    setBlogOwner(user && user.username === blog.user.username);
  }, [user, blog.user.username]);

  const addLike = async (blogId) => {
    try {
      const blogToUpdate = await blogService.getBlogById(blogId);
      blogToUpdate.likes += 1;
      const returnedBlog = await blogService.updateLike(blogId, blogToUpdate);
      setLikes(returnedBlog.likes);
      console.log(`You liked blog ${returnedBlog.title} which has in total ${returnedBlog.likes} likes`);
    } catch (error) {
      console.log('Something went wrong:', error);
    }
  };

  const removeBlog = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(blogId);
        onDelete(blogId);  console.log(`Blog with id ${blogId} deleted`);
      } catch (error) {
        console.log('Something went wrong, blog could not be deleted', error);
      }
    }
  };

  const BlogDetail = () => (
    <div>
      <p><b>Author:</b> {blog.author}</p>
      <p><b>Url:</b> <a href={blog.url}>{blog.url}</a></p>
      <p><b>Likes:</b> {updatedLikes} <button onClick={() => addLike(blog.id)}>like</button></p>
      <p><b>Added by user:</b> {blog.user.name}</p>
      {userIsBlogOwner && (
        <p><b>Remove blog:</b> <button onClick={() => removeBlog(blog.id)}>remove</button></p>
      )}
    </div>
  );

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={showBlogDetails}>view</button>
        {showDetails && <BlogDetail />}
      </div>
    </div>
  );
};
