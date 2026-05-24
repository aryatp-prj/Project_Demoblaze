const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    workers: 1,
    globalSetup: './globalSetup.js',
    use: {
        baseURL:    'https://www.demoblaze.com',
        headless:   false,
        screenshot: 'on',

    },
    reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright', { 
        outputFolder: 'allure-results',
        attachmentsBaseURL: 'allure-results'
    }]
],


    projects: [
        {
            name: 'signup',
            testMatch: '**/signup_testcase.spec.js',
        },
        {
            name: 'login',
            testMatch: '**/loginfun_testcase.spec.js',
            dependencies: ['signup'],
        },
        {
            name: 'purchase',
            testMatch: '**/purchase_testcase.spec.js',
            dependencies: ['login'],

        },
        {
            name: 'logout',
            testMatch: '**/logoutfun_testcase.spec.js',
            dependencies: ['signup'],

        },
    ],
});