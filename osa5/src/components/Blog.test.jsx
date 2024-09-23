import React from 'react'
import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

test('renders blog title', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: { username: 'Test_User' },
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText('Test Blog Title')
  expect(titleElement).toBeDefined()

  const author = screen.queryByText('Test Author')
  expect(author).toBeNull()

  const url = screen.queryByText('http://testurl.com')
  expect(url).toBeNull()

  const likes = screen.queryByText('10')
  expect(likes).toBeNull()

  const userName = screen.queryByText('Test_User')
  expect(userName).toBeNull()
})


test('renders blog title and interacts with view button', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: { username: 'Test_User', name: 'Test User Name' },
  }

  const user = {
    username: 'Test_User'
  }

  render(<Blog blog={blog} user={user} onDelete={() => {}} />)

  const user1 = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user1.click(viewButton)

  const url = screen.getByText('http://testurl.com')
  const likes = screen.getByText('10')
  const userName = screen.getByText('Test User Name')
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(userName).toBeDefined()
})

test('calls like handler twice when like button is clicked twice', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 10,
    user: { username: 'Test_User', name: 'Test User Name' },
  }

  const mockLikeHandler = vi.fn()

  const user = {
    username: 'Test_User'
  }

  render(<Blog blog={blog} user={user} onDelete={() => {}} onLike={mockLikeHandler} />)

  const user1 = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user1.click(viewButton)
  console.log('view click')

  const likeButton = screen.getByText('like')
  await user1.click(likeButton)

  console.log('First click')
  console.log('Mock handler calls:', mockLikeHandler.mock.calls.length)

  await user1.click(likeButton)
  console.log('Second click')
  console.log('Mock handler calls:', mockLikeHandler.mock.calls.length)
  expect(mockLikeHandler).toHaveBeenCalledTimes(2)
})