const dummy = (blogs) => {
    return 1;
  }
  
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item;
    }
    return blogs.map(blog=>blog.likes).reduce(reducer,0)
}

const favoritBlog = (blogs) => {
    const reducer = (max, curr) => {
        return max.likes > curr.likes ? max : curr;
      }
      return blogs.length === 0 ? undefined : blogs.reduce(reducer, 0);
    }

  module.exports = {
    dummy,
    totalLikes,
    favoritBlog
  }