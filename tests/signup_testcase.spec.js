const {test,expect} = require('@playwright/test');
const testdata = require('../utils/usernamePasswordData.json');
const PomanagerProject = require('../page_object/Pomanagerproject');

let pomanager;
let signin;

test.beforeEach(async ({page})=>{
    pomanager = new PomanagerProject(page); // shared one
    signin = pomanager.getSignup();
    await signin.goTo();
})
for(const data of testdata){
test(`Successful signup test case ${data.username}`,async ({page})=>{
    await signin.signupDetails(data.username,data.password);
    const message = await signin.signupBtn();
    console.log("Message: ", message);
    expect(message).toBe("Sign up successful.");
})
}

test('Sign up details adding and closing', async({page})=>{
    await signin.signupDetails("Aryaty","rteyu");
    await signin.closeBtn();
    await expect(page.locator("#sign-username")).not.toBeVisible();

})