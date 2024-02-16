const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs);
  })

blogRouter.get('/:id', async (request, response, next) => {
    try {
    const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog)
    } 
      else {
        response.status(404).end()
    }
        } 
    catch(exception){
    next(exception)
    }
})

blogRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  blog.save()
    .then(savedBlog => {
      response.status(201).json(savedBlog)
    })
    .catch(error => next(error))
})

module.exports = blogRouter