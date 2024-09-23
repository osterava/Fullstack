import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewBlog } from './NewBlog'
import { vi } from 'vitest'

test('calls addBlog with correct data when a new blog is created', async () => {
  const mockAddBlog = vi.fn()

  render(<NewBlog addBlog={mockAddBlog} />)

  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/title/i), 'Test Blog Title')
  await user.type(screen.getByLabelText(/author/i), 'Test Author')
  await user.type(screen.getByLabelText(/url/i), 'http://testurl.com')
  await user.click(screen.getByRole('button', { name: /create a new blog/i }))

  expect(mockAddBlog).toHaveBeenCalledWith({
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com'
  })
})
