class Login{
    constructor(page){
        this.page=page;
        this.loginpage = page.getByRole("link",{name:'Log in'})
        this.loginusername = page.locator("#loginusername");
        this.loginpassword = page.locator("#loginpassword");
        this.loginbtn = page.getByRole("button", {name:'Log in'});
    }
    async goTo(){
        await this.page.goto("https://www.demoblaze.com/");
    }
    async loginDetails(loginuser,loginpass){
        await this.loginpage.click();
        await this.loginusername.fill(loginuser);
        await this.loginpassword.fill(loginpass);
    }
    async loginBtn(){        
        await this.loginbtn.click();
    }
    async invalidLogin(){
        const dialogmessage = this.page.waitForEvent('dialog',{timeout:5000});
        await this.loginbtn.click();
        const dialog = await dialogmessage;
        const message = dialog.message();
        await dialog.accept();
        return message;
    }
}
module.exports = Login;
