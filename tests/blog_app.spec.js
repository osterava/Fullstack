import { loginWith } from './helper.js'
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
        await expect(page.locator('p').filter({ hasText: 'Olli Ter logged in' })).toBeVisible();
})

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'ollu1','WRONG')
        const errorMessageLocator = page.getByText('wrong password or username')
        await expect(errorMessageLocator).toBeVisible()
    })
  })

})
  