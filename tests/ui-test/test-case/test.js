import { Selector } from 'testcafe';
import { ClientFunction } from 'testcafe';
import Page from '../pom/page-object';
import uiHelper from '../../_helper/ui-helper';

require('dotenv').config();

const helper = new uiHelper();

fixture `UI Test Automation`
    //go to base url
    .page`${process.env.VERCEL_URL}`

test('Should Passed Checkout Product as Guest', async t => {
    
    await t
        //expected masuk ke home page
        .expect(Page.searchButton.exists).ok('expected masuk ke home page')
        
    //get url path dari product yang akan dipilih
    let productDetailUrl = await Selector(Page.productElement).nth(0).getAttribute('href')
    
    await t
        //click product
        .click(Page.productElement.nth(0))
    
    //get current url
    const getUrl = ClientFunction(() => window.location.href);
    let currentUrl = await getUrl.with({ boundTestRun: t })();
    
    await t
        //expect masuk ke product detail
        .expect(currentUrl).contains(productDetailUrl)
    
    let productArray = []
    let productName = await Page.productNameElement.innerText
    let productPrice = await Page.productPriceElement.innerText
    
    productArray.push({
        productName: productName,
        productPrice: productPrice
    });

    await t
        //click add to cart
        .click(Page.addToCartButton) 

    // pake helper
    let listItemData = await helper.checkCartDetail(productArray);

    await t
        //click proceed to checkout
        .click(Page.checkoutButton)

    await helper.checkOutOrder(listItemData, true);
})

test('Should Passed Checkout Product as Registered User', async t => {
    
    await t
        //expected masuk ke home page
        .expect(Page.searchButton.exists).ok('expected masuk ke home page')
        //click product light weight jacket
        .click(Page.productElement.find('span').withText('Lightweight Jacket'))
    
    let productArray = []
    let firstPickproductName = await Page.productNameElement.innerText
    let firstPickproductPrice = await Page.productPriceElement.innerText
    
    productArray.push({
        productName: firstPickproductName,
        productPrice: firstPickproductPrice
    });

    let productRoot = await Page.cartProductNameElement.withText('Lightweight Jacket').parent('li')
    
    await t
        //click add to cart
        .click(Page.addToCartButton) 
        //tambah quantity
        .click(productRoot.find('button').withAttribute('class',/Quantity_actions/).nth(2))
        //click close cart
        .click(Page.closeCartButton)
        //pick second product dari related product
        .click(Page.relatedProductElement.nth(2))

    let secondPickproductName = await Page.productNameElement.innerText
    let secondPickproductPrice = await Page.productPriceElement.nth(0).innerText
    
    productArray.push({
        productName: secondPickproductName,
        productPrice: secondPickproductPrice
    });

    await t
        //click add to cart
        .click(Page.addToCartButton) 

    //pake helper
    let listItemData = await helper.checkCartDetail(productArray);

    await t
        //click proceed to checkout
        .click(Page.checkoutButton)

    await helper.checkOutOrder(listItemData, false);
})

test('Should Passed Sort Product Price', async t => {
    
    await t
        //expected masuk ke home page
        .expect(Page.searchButton.exists).ok('expected masuk ke home page')
        //click product light weight jacket
        .click(Selector('a').withText('Shop All'))
        
        //get current url
        const getUrl = ClientFunction(() => window.location.href);
        let currentUrl = await getUrl.with({ boundTestRun: t })();
    
    await t
        //expect masuk ke page shop all
        .expect(currentUrl).contains('shop-all')
        //expect setidaknya ada 1 product yang tampil
        .expect(Page.productElement.exists).ok('expect setidaknya ada 1 product yang tampil')
})