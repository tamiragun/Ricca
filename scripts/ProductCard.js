//Reusable HTML element, courtesy of https://dev.to/anuradha9712/create-reusable-web-components-in-html-1llc

const productCardTemplate = document.createElement("template");
productCardTemplate.innerHTML = `

<div>
    <link href="css/product-card.css" rel="stylesheet">
    <div class="product card">
            <h1> Header - My First Blog on Web Component </h1>
    </div>
</div>`;

class ProductCard extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();
  }
  //attach all the created elements to the shadow root
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(productCardTemplate.content);
  }
}

customElements.define("product-card-component", ProductCard);
