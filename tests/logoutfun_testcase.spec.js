const {test,expect} = require('@playwright/test');
const testdata = require('../Utils/usernamePasswordData.json');
const PomanagerProject = require('../page_object/Pomanagerproject');

for(const data of testdata){
test(`Verify login and logout function for ${data.username}`, async({page})=>{
    const pomanager = new PomanagerProject(page);
    const login = pomanager.getLoginDet();
    const logout = pomanager.getLogout();
    await login.goTo();
    await login.loginDetails(data.username,data.password);
    await login.loginBtn();
    await expect(page.locator("#nameofuser")).toHaveText(`Welcome ${data.username}`,{timeout:10000});  
    await logout.logOut();
    await expect(page.getByRole('link',{name:'Sign up'})).toBeVisible();
})}

