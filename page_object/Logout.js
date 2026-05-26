class Logout{
    constructor(page){
        this.page = page;
        this.logout = page.getByRole('link',{name:'Log out'})        
    }
    async logOut(){
        await this.logout.click();
    }
}
module.exports=Logout;