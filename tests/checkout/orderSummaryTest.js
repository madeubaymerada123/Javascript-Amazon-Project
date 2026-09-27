import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  //beforeEach hook, it will run this function before each tests
  beforeEach(()=>{
  spyOn(localStorage, 'setItem');
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
      <div class="js-checkout-header"></div>
    `;
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadFromStorage();

    renderOrderSummary();
  });

  it('displays the cart', ()=>{
   expect( 
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');
  });

  it('removes a product (delete)', ()=> {
    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect( 
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  //16g check to see if product name is display correctly on the page (I was right but i missed the . in .js-product-name damn it)
  it('checks the product name', ()=> {
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
  })

  //16h check product price and each price should have a $ sign in it (I did it in first try OMG....well I did look at 16g for the code but still....)
  it('checks the product price', ()=>{
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');
  });

  //16f make afterEach and put the DOM js-test-container inside to remove the HTML, (did it on first try again lets go)
  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });


  //16j create a test for updating delivery option, had trouble with this in particular putting the classes in paymentSummary and orderSummary
  it('updates the delivery option', () => {
    // document.querySelector(`.js-delivery-option-${productId1}-3`).click();
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();
    expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);

    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('$42.75');
    expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('$63.50');
  });
});