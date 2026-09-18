import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });


// Exercise 13:

// import { cart } from "../data/cart.js";
// import { products } from "../data/products.js";

// // 1. Helper Functions (Arrow Functions)
// const formatCurrency = (priceCents) => (priceCents / 100).toFixed(2);

// const addToCart = (productId, quantity) => {
//   const matchingItem = cart.find((item) => item.productId === productId);

//   if (matchingItem) {
//     matchingItem.quantity += quantity;
//   } else {
//     cart.push({ productId, quantity });
//   }
// };

// const updateCartQuantity = () => {
//   const cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);
//   document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
// };

// // 2. Generate HTML
// let productsHTML = '';

// products.forEach((product) => {
//   productsHTML += `
//     <div class="product-container">
//       <div class="product-image-container">
//         <img class="product-image" src="${product.image}">
//       </div>

//       <div class="product-name limit-text-to-2-lines">
//         ${product.name}
//       </div>

//       <div class="product-rating-container">
//         <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
//         <div class="product-rating-count link-primary">
//           ${product.rating.count}
//         </div>
//       </div>

//       <div class="product-price">
//         $${formatCurrency(product.priceCents)}
//       </div>

//       <div class="product-quantity-container">
//         <select class="js-quantity-selector-${product.id}">
//           <option selected value="1">1</option>
//           <option value="2">2</option>
//           <option value="3">3</option>
//           <option value="4">4</option>
//           <option value="5">5</option>
//           <option value="6">6</option>
//           <option value="7">7</option>
//           <option value="8">8</option>
//           <option value="9">9</option>
//           <option value="10">10</option>
//         </select>
//       </div>

//       <div class="product-spacer"></div>

//       <div class="added-to-cart js-added-to-cart-${product.id}">
//         <img src="images/icons/checkmark.png">
//         Added
//       </div>

//       <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
//         Add to Cart
//       </button>
//     </div>
//   `;
// });

// document.querySelector('.js-products-grid').innerHTML = productsHTML;

// // 3. Notification Tracking & Event Listeners
// const addedMessageTimeouts = {};

// const displayAddedMessage = (productId) => {
//   const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
//   addedMessage.classList.add('added-to-cart-visible');

//   const previousTimeoutId = addedMessageTimeouts[productId];
//   if (previousTimeoutId) {
//     clearTimeout(previousTimeoutId);
//   }

//   const timeoutId = setTimeout(() => {
//     addedMessage.classList.remove('added-to-cart-visible');
//   }, 2000);

//   addedMessageTimeouts[productId] = timeoutId;
// };

// document.querySelectorAll('.js-add-to-cart').forEach((button) => {
//   button.addEventListener('click', () => {
//     const { productId } = button.dataset;

//     const selectQuantity = document.querySelector(`.js-quantity-selector-${productId}`);
//     const quantity = Number(selectQuantity.value);

//     addToCart(productId, quantity);
//     updateCartQuantity();
//     displayAddedMessage(productId);
//   });
// });