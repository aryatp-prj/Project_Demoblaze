class Signup{
    constructor(page){
        this.page = page;
        this.signup = page.getByRole("link",{name:'Sign up'});
        this.username = page.locator("#sign-username");
        this.password = page.locator("#sign-password");
        this.signbtn = page.getByRole("button",{name:'Sign up'});
        this.closebtn = page.locator(".btn.btn-secondary").nth(1);
    }
    async goTo(){
        await this.page.goto("https://www.demoblaze.com/")    
    }
    async signupDetails(username1,password1){
        await this.signup.click();
        await this.page.waitForSelector("#sign-username",{state :"visible"});
        await this.username.fill(username1);
        await this.password.fill(password1);
    }
    async signupBtn(){
        const dialogpromise = this.page.waitForEvent('dialog',{timeout:5000});
        await this.signbtn.click();
        const dialog = await dialogpromise;
        const message = dialog.message();
        await dialog.accept();
        return message;
    }
    async closeBtn(){
        await this.closebtn.click();
    }

}
module.exports=Signup;