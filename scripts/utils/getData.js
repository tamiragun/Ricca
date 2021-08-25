//Function to fetch product data. Returns an array of objects
export const getData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonResponse = await response.json();
    //return the array resolved from the above promise
    return jsonResponse;
  } catch (e) {
    console.log(
      "There has been a problem with your fetch operation: " + e.message
    );
  }
};
