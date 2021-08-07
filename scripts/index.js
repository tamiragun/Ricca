//Declare empty variable to store the data in
let productData = [];
//Create selector for the root dive, where we will display the results
const root = document.getElementById("root");
console.log(root);

//Function to fetch product data. Returns an array of objects
const getData = async () => {
  try {
    const response = await fetch(
      "https://fedsa-project-1.herokuapp.com/project-1/products"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    //Update global data variable to be the array resolved from the above promise
    productData = jsonResponse;
    //return jsonResponse;
  } catch (e) {
    console.log(
      "There has been a problem with your fetch operation: " + e.message
    );
  }
};

//Functin to generate a single product card
function generateProductCard(item) {
  const li = document.createElement("li");
  //li.classList.add("product-card-component");
  li.innerHTML = `
     
  <div class="product-image">
      <img src=${item.image} alt=""REPLACE"" />
  </div>
  <div class="product-description">
      <div class="product-title-description">
      <h4 class="product-title">${item.title}
      <p class="product-text">
      ${item.description}
      </p>
      </div>
      <div class="product-info">
      <div class="product-prices">
          <div class="old-price">${item.price}</div>
          <div class="new-price">${item.discountedPrice}</div>
      </div>
      <div class="product-icons">
          <a href="#"
          ><img src="./assets/heart.svg" alt="heart icon"
          /></a>
          <a href="#"
          ><img src="./assets/cart.svg" alt="cart icon"
          /></a>
      </div>
      </div>
  
  </div>
  
  `;

  return li;
}

function render() {
  const ul = document.createElement("ul");
  root.appendChild(ul);
  for (let i = 0; i < productData.length; i++) {
    const productCard = generateProductCard(productData[i]);
    ul.appendChild(productCard);
  }
}

getData().then(() => render());
