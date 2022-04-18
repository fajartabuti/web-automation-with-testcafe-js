/* eslint-disable no-undef */
import { Selector, t } from 'testcafe';
import generalHelper from '../_helper/general';
import Page from '../ui-test/pom/page-object';

require('dotenv').config();

export default class helper {
    async checkCartDetail(productArray) {

        await t
            //expect add to cart panel tampil
            .expect(Selector('h2').withText('My Cart').exists).ok('expect add to cart panel tampil')

        for (let i = 0; i < productArray.length; i++) {

            let productQty = await Selector('span').withText(productArray[i].productName).parent('li').find('input').withAttribute('class', /Quantity_input/).getAttribute('value')
            let totalPricePerItem = parseFloat(generalHelper.removeCurrency(productArray[i].productPrice)) * parseFloat(productQty)
            let totalPriceItemElement = await Selector('span').withText(productArray[i].productName).parent('div').nextSibling('div').child('span').innerText

            productArray[i].productQty = productQty;

            await t
                //expect product yang dipilih ada di cart
                .expect(Page.cartProductNameElement.withText(productArray[i].productName).exists).ok('expect product yang dipilih ada di cart')
                //expect total price item yang di pilih sesuai
                .expect(totalPriceItemElement).contains(totalPricePerItem.toString())
        }

        let itemInCartElement = await Page.cartItemElement
        let totalItemListInCart = await itemInCartElement.count
        let totalPrice = 0

        for (let j = 0; j < totalItemListInCart; j++) {
            let itemPrice = await Selector(itemInCartElement).nth(j).child('div').child('div').child('span').innerText
            itemPrice = parseFloat(generalHelper.removeCurrency(itemPrice))
            totalPrice = parseFloat(totalPrice + itemPrice)
        }

        await t
            //expect total sesuai
            .expect(Selector('span').withText(totalPrice.toString()).exists).ok('expect total sesuai')

        return productArray;
    }

    async checkOutOrder(itemData, isGuest) {

        let firstName = 'Fajar Auto'
        let lastName = generalHelper.getRandomAlphabet(4)
        let email = 'fajar' + generalHelper.getRandomAlphabet(4) + '@email.com'
        let password = 'test12345'

        await t
            //expect masuk ke checkout page
            .expect(Selector('h3').withText('Order Summary').exists).ok('expect masuk ke checkout page')

        if (isGuest == true) {
            //cek apakah user sudah login atau belum
            let signOutButton = await Selector('button').withAttribute('data-test', 'sign-out-link')

            if (signOutButton.exists == true) {
                //click signout button
                await t.click(signOutButton)
            }

            await t
                //expect tampil button continue as guest
                .expect(Page.continueAsGuestButton.exists).ok('expect tampil button continue as guest')
                //isi email
                .typeText(Page.customerEmail, process.env.EMAIL_GUEST)
                //klik button continue as guest
                .click(Selector(Page.continueAsGuestButton))
                //expect berhasil isi customer email
                .expect(Selector('button').withText('Edit').exists).ok('expect berhasil isi customer email')
        }
        else {
            //cek apakah user guest atau tidak
            let editButton = await Selector('button').withText('Edit')

            if (editButton.exists == true) {
                //click signout button
                await t.click(editButton)
            }

            await t
                //expect tampil button continue as guest
                .expect(Page.continueAsGuestButton.exists).ok('expect tampil button continue as guest')
                //click sign in now
                .click(Page.signInLink)
                //click create an account
                .click(Selector('a').withText('Create an account'))
                //expect tampil form register
                .expect(Page.checkoutCreateAccount.exists).ok('expect tampil form register')

            await t
                //isi first name
                .typeText(Selector('#firstName'), firstName)
                //isi last name
                .typeText(Selector('#lastName'), lastName)
                //isi email
                .typeText(Selector('#email'), email)
                //isi password
                .typeText(Selector('#password'), password)
                //click button create an account
                .click(Selector('#checkout-customer-create'))
                //expect berhasil create account
                .expect(Selector('button').withText('Sign Out').exists).ok('expect berhasil create account')
        }

        await t
            //isi first name di shipping
            .typeText(Selector('#firstNameInput'), firstName)
            //isi last name di shipping
            .typeText(Selector('#lastNameInput'), lastName)
            //isi address di shipping
            .typeText(Selector('#addressLine1Input'), 'Jalan Jalan Test Euy')
            //isi city di shipping
            .typeText(Selector('#cityInput'), 'Bekasi Punya gaye')
            //click dropdown country
            .click(Selector('#countryCodeInput'))
            //pilih country
            .click(Selector('#countryCodeInput').child('option').nth(1))
            //isi postal code
            .typeText(Selector('#postCodeInput'), '17111')
            //pilih shipping method
            .click(Selector('span').withText('Free Shipping'))
            //click continue
            .click(Selector('#checkout-shipping-continue'))
            //input card number
            .typeText(Selector('#ccNumber'), process.env.CC_NUMBER)
            //input expiry date
            .typeText(Selector('#ccExpiry'), '03' + ((new Date().getFullYear() % 100) + 5))
            //input card holder name
            .typeText(Selector('#ccName'), firstName + lastName)

        let totalItemQty = 0;

        for (let i = 0; i < itemData.length; i++) {
            let qtyItem = parseInt(itemData[i].productQty)
            totalItemQty = totalItemQty + qtyItem
        }

        totalItemQty = totalItemQty.toString()

        await t
            //expect total item sesuai
            .expect(Selector('h3').withAttribute('data-test', 'cart-count-total').withText(totalItemQty + ' Item').exists).ok('expect total item sesuai')

        for (let j = 0; j < itemData.length; j++) {
            let totalPricePerItem = parseFloat(itemData[j].productQty) * parseFloat(generalHelper.removeCurrency(itemData[j].productPrice))
            let objectItem = await Selector('h5').withAttribute('data-test', 'cart-item-product-title')

            await t
                //expect qty dan product name sesuai
                .expect(objectItem.withText(itemData[j].productQty + ' x ' + itemData[j].productName).exists).ok('expect total item sesuai')
                //expect total harga per item sesuai
                .expect(Selector(objectItem).parent('div').nextSibling('div').child('div').withAttribute('data-test', 'cart-item-product-price').withText('$' + totalPricePerItem).exists).ok('//expect total harga per item sesuai')
        }

        let itemOrderSummaryElement = await Selector('li').withAttribute('class', /productList-item/)
        let totalItemList = await itemOrderSummaryElement.count
        let totalItemPrice = 0

        for (let k = 0; k < totalItemList; k++) {
            let itemPrice = await Selector(itemOrderSummaryElement).nth(k).find('div').withAttribute('data-test', 'cart-item-product-price').innerText
            itemPrice = parseFloat(generalHelper.removeCurrency(itemPrice))
            totalItemPrice = parseFloat(totalItemPrice + itemPrice)
        }

        let shipping = await Selector('div').withAttribute('data-test', 'cart-shipping').find('span').withAttribute('data-test', 'cart-price-value').innerText
        let tax = await Selector('div').withAttribute('data-test', 'cart-taxes').find('span').withAttribute('data-test', 'cart-price-value').innerText

        if (isNaN(parseFloat(shipping))) {
            shipping = parseFloat(0)
        }

        shipping = shipping.toString()

        let total = totalItemPrice + parseFloat(generalHelper.removeCurrency(shipping)) + parseFloat(generalHelper.removeCurrency(tax))

        await t
            //expect subtotal sesuai
            .expect(Selector('div').withAttribute('data-test', 'cart-subtotal').find('span').withAttribute('data-test', 'cart-price-value').withText('$' + totalItemPrice).exists).ok('expect subtotal sesuai')
            //expect total sesuai
            .expect(Selector('div').withAttribute('data-test', 'cart-total').find('span').withAttribute('data-test', 'cart-price-value').withText('$' + total).exists).ok('expect total sesuai')
            //klik button place order
            .click(Selector('#checkout-payment-continue'))
            //expect berhasil order
            .expect(Selector('h1').withAttribute('data-test', 'order-confirmation-heading').withText(firstName).exists).ok('expect berhasil order')
    }
}
