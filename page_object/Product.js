class Product{
    constructor(page){
        this.page = page;
        this.addtocart = page.getByRole('link',{name:'Add to cart'}); 
    }
    async productAdd(productname){
        const productlink = this.page.getByRole('link',{name:productname});
        await productlink.click();
    }
    async checkOut(){
        const dialogmessage = this.page.waitForEvent('dialog',{timeout:5000});
        await this.addtocart.click();
        const dialog = await dialogmessage;
        const message = dialog.message();
        await dialog.accept();
        return message;
    }   
}
module.exports = Product;