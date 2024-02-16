const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

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

blogRouter.post('/', async (request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user:user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    });
    response.json(updated.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter