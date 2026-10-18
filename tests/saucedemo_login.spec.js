const { test, expect } = require('@playwright/test');
const SaucedemoLogin = require('../page_object/SaucedemoLogin');

test.describe('SauceDemo login page', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new SaucedemoLogin(page);
        await loginPage.goTo();
    });

    async function expectLoginError(expectedMessage) {
        await expect(loginPage.usernameInput).toHaveClass(/input_error/);
        await expect(loginPage.passwordInput).toHaveClass(/input_error/);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(expectedMessage);
    }

    test('TC01 - Valid login redirects to inventory page', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory\.html$/);
        await expect(page.locator('.title')).toHaveText('Products');
    });

    test('TC02 - Invalid credentials shows error message', async () => {
        await loginPage.login('invalid_user', 'wrong_password');

        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
        await expectLoginError('Username and password do not match');
    });

    test('TC03 - Locked out user shows locked error message', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');

        await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/');
        await expectLoginError('Sorry, this user has been locked out');
    });
});
