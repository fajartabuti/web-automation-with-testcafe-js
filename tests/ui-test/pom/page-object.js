import { Selector } from 'testcafe';

class Page {
    constructor () {
        //button
        this.searchButton = Selector('#search')
        this.addToCartButton = Selector('button').withAttribute('aria-label','Add to Cart')
        this.closeCartButton = Selector('span').withText('Close')
        this.checkoutButton = Selector('a').withText('PROCEED TO CHECKOUT')
        this.continueAsGuestButton = Selector('#checkout-customer-continue')
        this.checkoutCreateAccount = Selector('#checkout-customer-create')

        //product
        this.productElement = Selector('a').withAttribute('class', /ProductCard_root/)
        this.productNameElement = Selector('h3').withAttribute('class', /ProductTag_name/).nth(0).child('span')
        this.productPriceElement = Selector('div').withAttribute('class', /ProductTag_price/).nth(0)
        this.relatedProductElement = Selector('div').withAttribute('class',/ProductView_relatedProductsGrid/).find('a').withAttribute('class',/ProductCard_root/)
        
        //cart
        this.cartItemElement = Selector('li').withAttribute('class', /CartItem_root/)
        this.cartProductNameElement = Selector('span').withAttribute('class',/CartItem_productName/)

        //checkout
        this.customerEmail = Selector('#email')
        this.signInLink = Selector('#checkout-customer-login')
    }
}

export default new Page();
