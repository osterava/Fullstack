const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  response.json(blogs.map(b => b.toJSON()));
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

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = await request.user

  const likes = body.likes === undefined
    ? 0
    : body.likes

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: likes,
    user:user._id
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = await request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({
      error: 'no permission to delete'
    })
  }

})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const body = request.body
  const user = await request.user
  const blog = await Blog.findById(request.params.id)

  const blogUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  if (blog.user.toString() === user._id.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogUpdate, { new: true })
    response.json(updatedBlog)
  } else {
    response.status(401).json({
      error: 'no permission to modify'
    })
  }
})

module.exports = blogRouter