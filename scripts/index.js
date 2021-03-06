import { getData } from "./utils/getData.js";

//Create selector for the root div, where we will display the results
const root = document.getElementById("root");

//Function to generate a single product card
function generateProductCard(item) {
  const li = document.createElement("li");

  const productImageDiv = document.createElement("div");
  productImageDiv.classList.add("product-image");
  li.appendChild(productImageDiv);

  const productImg = document.createElement("img");
  productImg.setAttribute("src", item.image);
  productImg.setAttribute("alt", "");
  productImageDiv.appendChild(productImg);

  const productDescriptionDiv = document.createElement("div");
  productDescriptionDiv.classList.add("product-description");
  li.appendChild(productDescriptionDiv);

  const productTitleDescriptionDiv = document.createElement("div");
  productDescriptionDiv.classList.add("product-title-description");
  productDescriptionDiv.appendChild(productTitleDescriptionDiv);

  const productTitle = document.createElement("h4");
  productTitle.classList.add("product-title");
  productTitle.textContent = item.title;
  productTitleDescriptionDiv.appendChild(productTitle);

  const productText = document.createElement("p");
  productText.classList.add("product-text");
  productText.textContent = item.description;
  productTitleDescriptionDiv.appendChild(productText);

  const productInfoDiv = document.createElement("div");
  productInfoDiv.classList.add("product-info");
  productDescriptionDiv.appendChild(productInfoDiv);

  const productPricesDiv = document.createElement("div");
  productPricesDiv.classList.add("product-prices");
  productInfoDiv.appendChild(productPricesDiv);

  const oldPrice = document.createElement("div");
  oldPrice.classList.add("old-price");
  oldPrice.textContent = item.price;
  productPricesDiv.appendChild(oldPrice);

  const newPrice = document.createElement("div");
  newPrice.classList.add("new-price");
  newPrice.textContent = item.discountedPrice;
  productPricesDiv.appendChild(newPrice);

  const productIconsDiv = document.createElement("div");
  productIconsDiv.classList.add("product-icons");
  productInfoDiv.appendChild(productIconsDiv);

  const heartLink = document.createElement("a");
  heartLink.id = "heart";
  heartLink.addEventListener("click", () => userProfile.likeItem(item));
  productIconsDiv.appendChild(heartLink);

  const heartImage = document.createElement("img");
  heartImage.id = item.id;
  heartImage.setAttribute("src", "./assets/heart.svg");
  heartImage.setAttribute("alt", "heart icon");
  heartLink.appendChild(heartImage);

  const cartLink = document.createElement("a");
  cartLink.id = "cart";
  cartLink.addEventListener("click", () => shoppingCart.addToCart(item));
  productIconsDiv.appendChild(cartLink);

  const cartImage = document.createElement("img");
  cartImage.setAttribute("src", "./assets/cart.svg");
  cartImage.setAttribute("alt", "cart icon");
  cartLink.appendChild(cartImage);

  return li;
}

//IIFE that defines functions to get the cart items and add items
const shoppingCart = (function () {
  const items = [];
  function getItems() {
    return items;
  }
  function addToCart(item) {
    //Add to the array of items
    items.push(item);
    //Update the total cost displayed on the page
    total.textContent =
      "The total cost of your products is: R" + getTotalCost();
  }
  function getTotalCost() {
    const total = items.reduce((total, item) => {
      total += item.discountedPrice;
      return total;
    }, 0);
    return total;
  }
  return {
    getItems,
    addToCart,
    getTotalCost,
  };
})();

//Display the load more button
const loadMoreButton = document.createElement("button");
loadMoreButton.classList.add("load-more-button");
loadMoreButton.setAttribute("onclick", "window.location.href='#'");
loadMoreButton.textContent = "LOAD MORE";

//Display the cart total at the bottom of the page
const total = document.createElement("div");
total.classList.add("cart-total");
total.textContent =
  "The total cost of your products is: R" + shoppingCart.getTotalCost();

//Function to render all the product cards for the received data, and total price
function render(productData) {
  const productsWrapperDiv = document.createElement("div");
  productsWrapperDiv.classList.add("products-wrapper");
  root.appendChild(productsWrapperDiv);
  const ul = document.createElement("ul");
  productsWrapperDiv.appendChild(ul);
  for (let i = 0; i < productData.length; i++) {
    const productCard = generateProductCard(productData[i]);
    ul.appendChild(productCard);
  }
  productsWrapperDiv.appendChild(loadMoreButton);
  root.appendChild(total);
}

//IIFE that defines functions to get the liked items and add liked items
const userProfile = (function () {
  const likedItems = [];
  function getLikedItems() {
    return likedItems;
  }
  function likeItem(likedItem) {
    const heart = document.getElementById(likedItem.id);
    //check if the liked items already contains this object
    if (!likedItems.includes(likedItem)) {
      //Add to the array of items
      likedItems.push(likedItem);
      //Change the heart button look to full
      heart.removeAttribute("src", "./assets/heart.svg");
      heart.setAttribute("src", "./assets/activeHeart.svg");
    } else {
      //Remove from the array of likes
      const indexToRemove = likedItems.indexOf(likedItem);
      likedItems.splice(indexToRemove);
      //Change the heart button look back to empty
      heart.removeAttribute("src", "./assets/activeHeart.svg");
      heart.setAttribute("src", "./assets/heart.svg");
    }
  }
  return {
    getLikedItems,
    likeItem,
  };
})();

//Calling the data fetch and render function to display it on the page
const url = "https://fedsa-project-1.herokuapp.com/project-1/products";

async function initializePage() {
  const productData = await getData(url);
  render(productData);
}

initializePage();
