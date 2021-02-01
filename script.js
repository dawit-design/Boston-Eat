// zomato api to search for my data
const DOMAIN = `https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city`;
const API_KEY = `9d76e594aa790973097bf60d5815e470`
// const contentType = `application/json`
const BASE_URL = `${DOMAIN}?apikey=&${API_KEY}`;


//async function to fetch data from the api 
async function restaurantsName(restaurant) {
  try {
    let response = await axios.get(`${BASE_URL}s=${restaurant}`, {
      headers: { "user-key": "9d76e594aa790973097bf60d5815e470", "content-type": "application/json", }})
    // console.log(response)
    const restaurantList = response.data.restaurants
    // console.log(restaurantList)
    
    restaurantsGetData(restaurantList)
    return response;
  } catch (error) {
    console.log(error)
  }
}

// restaurantsName()

// function to itterate and collect data that is going to be shown on my web page
function restaurantsGetData(restaurantList) {
  let restContainer = document.querySelector('#rest-list') 
  restaurantList.forEach(restaurantList => {
    let newRes = document.createElement('div')
    newRes.classList.add('each-res')
    const restaurantData = `
    <h6>Name: ${restaurantList.restaurant.name}</h6> 
    <a href="${restaurantList.restaurant.photos_url}">photos</a>
    <a href="${restaurantList.restaurant.phone_numbers}"><i class="fas fa-mobile-alt"></i> Call Us</a>
    <a href="${restaurantList.restaurant.url}"><i class="fas fa-globe"></i> Website</a>
    <p>Hours: ${restaurantList.restaurant.timings}</p>
    <h6>Address: ${restaurantList.restaurant.location.address}</h6>
    ` // console.log(restContainer)
   restContainer.appendChild(newRes)
   newRes.insertAdjacentHTML('beforeend', restaurantData)
    return restaurantData;
    })
}


// search function to take input value and add event listener for my buttons
const searchButton = document.querySelector('.rest-but');
// console.log(searchButton
  
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
  removeRestaurants()
      const searchValue = document.querySelector('#input-class');
      // console.log(searchValue)
      for (let i = 0; i < searchValue.length; i++){
        if (searchValue[i].value === `${restaurantList.restaurant.name}`) {
          return true;
        } else {
          return null;
        }
      }
      restaurantsName(searchValue)
      
    })
  //  

// function to remove my first result from the browser and display the next search data
function removeRestaurants() {
  const restsContainer = document.querySelector('#rest-list')
  while (restsContainer.lastChild)
    restsContainer.removeChild(restsContainer.lastChild)
}
// my second api to display data by rating
async function ratedRestaurants() {
  try {
    let res = await 
      axios({
        method: "GET",
        url : `https://developers.zomato.com/api/v2.1/location_details?entity_id=289&entity_type=city`,
        headers: {
                "user-key": "9d76e594aa790973097bf60d5815e470",
                "content-type": "application/json"
              }
      })
    // console.log(res.data.best_rated_restaurant)
    let bestRate = res.data.best_rated_restaurant
    let cusineRest = res.data.best_rated_restaurant.restaurant
    getMoreData(bestRate)

  }catch (err) {
    console.log(err)
  }
  

} 

function getMoreData(bestRate) {
  let newData = document.querySelector('#rest-list')
  bestRate.forEach(bestRate => {
    let newdiv = document.createElement('div')
    newdiv.classList.add('rate-class')
    const ratingData = 
      ` <h6>Name: ${bestRate.restaurant.name}</h4>
        <p>Rating: ${bestRate.restaurant.user_rating.aggregate_rating}</p>
        <a href="${bestRate.restaurant.url}"><i class="fas fa-globe"></i> Website</a>
    `
    console.log(newData)
    newData.appendChild(newdiv)
    newdiv.insertAdjacentHTML('beforeend', ratingData)
    return newData;
  })
  
}
const searchNextButton = document.querySelector('.rate-btn');
searchNextButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeRatedRestaurants()
    const searchValue = document.querySelector('#rate-class').value
  ratedRestaurants(searchValue)
    
})
function removeRatedRestaurants() {
  const  ratedData= document.querySelector('#rest-list')
  while (ratedData.lastChild)
  ratedData.removeChild(ratedData.lastChild)
}

// another function to display restaurants by cusine from the same api
async function cuisinesRestaurants() {
  try {
    let res = await 
      axios({
        method: "GET",
        url : `https://developers.zomato.com/api/v2.1/location_details?entity_id=289&entity_type=city`,
        headers: {
                "user-key": "9d76e594aa790973097bf60d5815e470",
                "content-type": "application/json"
              }
      })
    // console.log(res.data.best_rated_restaurant)
    let cusineRest = res.data.best_rated_restaurant
    cuisineData(cusineRest)
  }catch (err) {
    console.log(err)
  }
  

} 
// cuisinesRestaurants()


function cuisineData(cusineRest) {
  let rawData = document.querySelector('#rest-list')
  cusineRest.forEach(cusineRest => {
    let cuisinediv = document.createElement('div')
    cuisinediv.classList.add('cuisine-class')
    const cuisineData = 
      ` <p>Name: ${cusineRest.restaurant.name}</p>
        <p>Cusine: ${cusineRest.restaurant.cuisines}</p>
        <a href="${cusineRest.restaurant.url}" <i class="fas fa-globe"></i> Website</a>
        <p>Highlights: ${cusineRest.restaurant.highlights}</p>
    `
    console.log(cuisineData)
    rawData.appendChild(cuisinediv)
    cuisinediv.insertAdjacentHTML('beforeend', cuisineData)
    return rawData;

  })
  
}


const searchThirdButton = document.querySelector('.cuisine-btn');
searchThirdButton.addEventListener('click', (e) => {
  e.preventDefault();
  removeCusineRestaurants()
  const searchValue = document.querySelector('#cuisine-id').value
  
    cuisinesRestaurants(searchValue)
})
  
function removeCusineRestaurants() {
  const rawData = document.querySelector('#rest-list')
  while (rawData.lastChild)
    rawData.removeChild(rawData.lastChild)
}


  document.getElementById("copyright").appendChild(document.createTextNode(new Date().getFullYear()));