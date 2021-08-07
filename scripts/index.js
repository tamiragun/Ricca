//Declare empty variable to store the data in
let data = [];
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
    data = jsonResponse;
    //return jsonResponse;
  } catch (e) {
    console.log(
      "There has been a problem with your fetch operation: " + e.message
    );
  }
};

getData().then(() => console.log(data));

function render() {
  const div = document.createElement("div");
  div.textContent = "This was generated with JS";
  root.appendChild(div);
}

render();
