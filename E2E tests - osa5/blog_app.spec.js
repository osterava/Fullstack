import { createBlog, loginWith } from './helper.js'
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Olli Ter',
        username: 'ollu1',
        password: 'pass'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginHeader = await page.getByText('Login to the blog application')
    await expect(loginHeader).toBeVisible()

    const usernameInput = await page.getByTestId('username')
    await expect(usernameInput).toBeVisible()

    const passwordInput = await page.getByTestId('password')
    await expect(passwordInput).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'ollu1','pass')
        await expect(page.locator('p').filter({ hasText: 'Olli Ter logged in' })).toBeVisible()

})

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'ollu1','WRONG')
        const errorMessageLocator = page.getByText('wrong password or username')
        await expect(errorMessageLocator).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page,'ollu1','pass')  
      await page.waitForTimeout(1000)
    })
  
    test('a new blog can be created', async ({ page }) => {
        await page.waitForSelector('text=Add a new blog', { timeout: 60000 })
        await page.getByText('Add a new blog').click()
        await page.getByLabel('title').fill('Test Blog Title')
        await page.getByLabel('author').fill('Test Author')
        await page.getByLabel('url').fill('http://testblog.com')
        await page.getByRole('button', { name: 'create a new blog' }).click()
        await page.waitForTimeout(500);
        
        const blogTitleLocator = page.getByText('Test Blog Title view')
        await expect(blogTitleLocator).toBeVisible()
    })

    test('a logged in user can like a blog', async  ({page}) => {

        await page.waitForSelector('text=Add a new blog', { timeout: 60000 })
        await page.getByText('Add a new blog').click()
        await page.getByLabel('title').fill('Test Blog Title')
        await page.getByLabel('author').fill('Test Author')
        await page.getByLabel('url').fill('http://testblog.com')
        await page.getByRole('button', { name: 'create a new blog' }).click()
        await page.waitForTimeout(500)

        const blogTitleLocator = page.getByText('Test Blog Title view')
        await expect(blogTitleLocator).toBeVisible()

        await page.getByText('view').click()
      
        const likeButton = page.getByRole('button', { name: 'like' });
        await likeButton.click();
        const likesLocator = page.getByText('Likes: 1');

        await expect(likesLocator).toBeVisible();
    })

    test('a blog can be deleted', async ({ page }) => {
    
      await page.getByText('Add a new blog').click()
      await page.getByLabel('title').fill('Test Blog Title1')
      await page.getByLabel('author').fill('Test Author1')
      await page.getByLabel('url').fill('http://testblog.com1')
      await page.getByRole('button', { name: 'create a new blog' }).click()
      await page.waitForTimeout(1000)

      const blogLocator = page.getByText('Test Blog Title1 view')
      await expect(blogLocator).toBeVisible()

      await page.getByText('view').click()

      page.on('dialog', dialog => dialog.accept()) 

      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeVisible()
      await removeButton.click()

      await expect(page.getByText('Test Blog Title1 view')).not.toBeVisible()
    })
    
    test('a blog remove button is rendered only for logged-in user', async ({ page, request }) => {
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Testaaja',
          username: 'test',
          password: 'pass'
        }
      })
    
      await loginWith(page, 'test', 'pass')
      await expect(page.locator('p').filter({ hasText: 'Testaaja logged in' })).toBeVisible()
    
      await page.getByText('Add a new blog').click()
      await page.getByLabel('title').fill('Test Blog Title1')
      await page.getByLabel('author').fill('Test Author1')
      await page.getByLabel('url').fill('http://testblog.com1')
      await page.getByRole('button', { name: 'create a new blog' }).click()
      await page.waitForTimeout(1000)
    
      const blogLocator = page.getByText('Test Blog Title1 view')
      await expect(blogLocator).toBeVisible()
    
      await page.getByText('view').click()
    
      const removeButton = page.getByRole('button', { name: 'remove' })
      await expect(removeButton).toBeVisible()
    
      const logoutLocator = page.getByRole('button', { name: 'logout' })
      await expect(logoutLocator).toBeVisible()
      await logoutLocator.click()

      await request.post('http://localhost:3003/api/users', {
        data: {
          name: 'Another User',
          username: 'user2',
          password: 'pass2'
        }
      })
    
      await loginWith(page, 'user2', 'pass2')
      await expect(page.locator('p').filter({ hasText: 'Another User logged in' })).toBeVisible()
    
      await page.getByText('view').click()
    
      await expect(removeButton).not.toBeVisible()

    })

    test('blogs are sorted by likes in descending order', async ({ page, request }) => {

      await expect(page.locator('p').filter({ hasText: 'Olli Ter logged in' })).toBeVisible()

      await createBlog(page,'Blog A', 'Author A','http://testblogA.com')
      await page.waitForTimeout(1000)
      await createBlog(page,'Blog B', 'Author B','http://testblogB.com')
      await page.waitForTimeout(1000)
      await createBlog(page,'Blog C', 'Author C','http://testblogC.com')
      await page.waitForTimeout(1000)

      const buttons = page.locator('button', { hasText: 'view' })

      await buttons.nth(1).click()
      await page.getByRole('button', { name: 'like' }).first().click()
      await buttons.nth(1).click()

      await buttons.nth(2).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.waitForTimeout(1000)
      await page.getByRole('button', { name: 'like' }).click()
      await buttons.nth(2).click()
      await page.reload()
      await page.waitForTimeout(1000)

      const blogs = page.locator('text=Blog').filter({ hasText: 'view' })
      const blogTitles = await blogs.allTextContents()
      console.log(blogTitles)

      expect(blogTitles).toEqual([
        'Blog C view',
        'Blog B view',
        'Blog A view',
      ])
    })
  })
})