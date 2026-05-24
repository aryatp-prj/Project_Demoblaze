class Cart{
    constructor(page){
        this.page = page;
        this.cart = page.getByRole("link",{name:'Cart',exact:true});
        this.placeorder = page.getByRole("button",{name:'Place Order'});
        this.name = page.locator("#name");
        this.country = page.locator("#country");
        this.city = page.locator("#city");
        this.card = page.locator("#card");
        this.month = page.locator("#month");
        this.year = page.locator("#year");
        this.purchase = page.getByRole("button",{name:'Purchase'});
        this.okbtn = page.getByRole("button",{name:'OK'});
    }
    async placeOrder(){
        await this.cart.click();
        await this.placeorder.click();
    }
    async purchaseDetails(name1,country1,city1,card1,month1,year1){
        await this.name.fill(name1);
        await this.country.fill(country1);
        await this.city.fill(city1);
        await this.card.fill(card1);
        await this.month.fill(month1);
        await this.year.fill(year1);
        await this.purchase.click();       
    }
    async finishPurchase(){
        await this.okbtn.click();
        await this.page.waitForSelector('.sweet-alert', { state: 'hidden' });
    }
}
module.exports=Cart;
