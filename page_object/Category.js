class Category{
    constructor(page){
        this.page = page;        

    }
    async selectCategory(categoryname){
        const item = this.page.getByRole('link', {name: categoryname, exact: true});
        await item.scrollIntoViewIfNeeded();
        await item.click();
    }
}
module.exports=Category;
