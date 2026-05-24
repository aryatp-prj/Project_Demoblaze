const Signup = require('./Signup');
const Login = require('./Login');
const Product = require('./Product');
const Category = require('./Category');
const Cart = require('./Cart');
const Logout = require('./Logout');

class PomanagerProject{

    constructor(page){

        this.page = page;

        this.signupobj = new Signup(page);
        this.logindet = new Login(page);
        this.productadd = new Product(page);
        this.category = new Category(page);
        this.cart = new Cart(page);
        this.logout = new Logout(page);
    }

    getSignup(){
        return this.signupobj;
    }

   getLoginDet(){
        return this.logindet;
    }

    getProduct(){
        return this.productadd;
    }

   getCategory(){
        return this.category;
    }

    getCart(){
        return this.cart;
    }

    getLogout(){
        return this.logout;
    }
}

module.exports = PomanagerProject;