const {test,expect} = require('@playwright/test');
const testdata = require('../Utils/usernamePasswordData.json');
const PomanagerProject = require('../page_object/Pomanagerproject');

let pomanager;
let loging;

test.beforeEach(async ({page})=>{
    pomanager = new PomanagerProject(page);
    loging = pomanager.getLoginDet();
    await loging.goTo();
})
for(const data of testdata){
test(`Verify login with valid username and password ${data.username}`, async({page})=>{
    await loging.loginDetails(data.username,data.password);
    await loging.loginBtn();
    await expect(page.locator("#nameofuser")).toHaveText(`Welcome ${data.username}`,{timeout:10000});  
})
}

test('Verify login with invalid username and valid password', async({page})=>{
    await loging.loginDetails("invalid44","Vrinda@1234");
    const message = await loging.invalidLogin();
    expect(message).toBe("User does not exist.");
})

test('Verify login with valid username and invalid password',async({page})=>{
    await loging.loginDetails("mkeydrs777","invalidpass");
    const message = await loging.invalidLogin();
    expect(message).toBe("Wrong password.");
})

test('Verify login with invalid username and invalid password', async({page})=>{
    await loging.loginDetails("invalid44","invalidpass");
    const message = await loging.invalidLogin();
    expect(message).toBe("User does not exist.");
})