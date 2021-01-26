async function restaurants() {
  axios({
    method: "GET",
    // url: "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1",
    url: "https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&order=asc",
    // url: "https://developers.zomato.com/api/v2.1/categories",
    headers: {
      "user-key": "9d76e594aa790973097bf60d5815e470",
      "content-type": "application/json"
    }
  })
    .then(response => {
      console.log(response.data.restaurants[12].restaurant)
      const restaurantList = response.data.restaurants[12].restaurant.name
      // restGetData(restaurantList)
    })
    .catch(error => {
      console.log(error);
    });
}
// restaurants()

function restGetData(restaurantList) {
  const restaurantData = `
  <h3>Name: ${restaurantList}</h3>
  `
  let restContainer = document.querySelector('#rest-list')
  // console.log(restContainer)
  
  restContainer.insertAdjacentHTML('beforeend', restaurantData)
  return restaurantData;

}
const searchButton = document.querySelector('.cata-butt');
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputVal = document.querySelector('.input-class').value  
    // console.log(inputVal)
    restaurants(inputVal)
  })

// const searchInput = document.querySelector('.input-class');
// searchInput.addEventListener('keyup', e => {
//   const searchString = e.target.value;
//   // console.log(searchString)
//   const filterResult = catagories.fiter(categories => {
//     return (categories.name.includes(searchString)
//     );
//   })
// });
