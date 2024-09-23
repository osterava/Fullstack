const loginWith = async (page, username, password) => {
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }
  
  const createBlog = async (page, title, author, url) => {
    await page.waitForSelector('text=Add a new blog', { timeout: 60000 })
    await page.getByText('Add a new blog').click()
    await page.getByLabel('title').fill(title)
    await page.getByLabel('author').fill(author)
    await page.getByLabel('url').fill(url)
    await page.getByRole('button', { name: 'create a new blog' }).click()
  }

  export { loginWith, createBlog}
  