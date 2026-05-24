class Logout{
    constructor(page){
        this.page = page;
        this.logout = page.getByRole('link',{name:'Log out'})        
    }
    async logOut(){
        this.logout.click();
    }
}
module.exports=Logout;