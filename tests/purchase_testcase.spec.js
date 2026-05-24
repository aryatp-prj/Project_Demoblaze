const {test,expect} = require('@playwright/test');
const PomanagerProject = require('../page_object/Pomanagerproject');
const testdata = require('../Utils/purchaseDetailsData.json')
let pomanager;
let loging;
let product;
let category;
let cart;

test.beforeEach(async ({page})=>{
    pomanager = new PomanagerProject(page);
    loging = pomanager.getLoginDet();
    product = pomanager.getProduct();
    category = pomanager.getCategory();
    cart = pomanager.getCart();
    await loging.goTo();
    await loging.loginDetails("holl55","Vrinda@1234");
    await loging.loginBtn();
})

test('Login with valid credentials and Select a product then Add to Cart after Click "ok" on the popup',async ({page})=>{
    await product.productAdd("Samsung galaxy s6");
    await expect(page.getByRole('link',{name:'Add to cart'})).toBeVisible();
    const message = await product.checkOut();
    expect(message).toBe("Product added.");
})

for(const data of testdata){
test(`Purchase a ${data.product} under ${data.category} category`, async ({page})=>{
    await category.selectCategory(data.category);
    await expect(page.getByRole('link',{name:`${data.product}`})).toBeVisible();
    await product.productAdd(data.product);
    await expect(page.getByRole('link',{name:'Add to cart'})).toBeVisible();
    const message = await product.checkOut();
    expect(message).toBe("Product added.");
    await cart.placeOrder();
    await expect(page.locator("#name")).toBeVisible();
    await cart.purchaseDetails(data.firstName,data.country,data.city,data.card,data.month,data.year);
    await expect(page.getByText("Thank you for your purchase!")).toBeVisible();
    await cart.finishPurchase();
    await expect(page.getByText("Thank you for your purchase!")).not.toBeVisible();
    
})
}