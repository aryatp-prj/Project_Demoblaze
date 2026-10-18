class SaucedemoLogin {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goTo() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }

    async getErrorMessage() {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return this.errorMessage.textContent();
    }

    async isOnInventoryPage() {
        await this.page.waitForURL('**/inventory.html', { timeout: 5000 });
        return this.page.url().includes('/inventory.html');
    }
}

module.exports = SaucedemoLogin;
