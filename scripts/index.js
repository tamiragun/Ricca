//Declare empty variable to store the data in
let data = [];

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
