//Reusable HTML element, courtesy of https://dev.to/anuradha9712/create-reusable-web-components-in-html-1llc
//and https://developers.google.com/web/fundamentals/web-components/customelements

class ProductCard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
     
     <div class="product-image">
         <img src=${this.getAttribute("src")} alt=${this.getAttribute("alt")} />
     </div>
     <div class="product-description">
         <div class="product-title-description">
         <h4 class="product-title">${this.getAttribute("product-title")}</h4>
         <p class="product-text">
         ${this.getAttribute("text")}
         </p>
         </div>
         <div class="product-info">
         <div class="product-prices">
             <div class="old-price">${this.getAttribute("old-price")}</div>
             <div class="new-price">${this.getAttribute("new-price")}</div>
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
  }
}

customElements.define("product-card-component", ProductCard);
