// https://gis.cityofboston.gov/arcgis/rest/services/EnvironmentEnergy/OpenData/MapServer/4/query?outFields=*&where=1%3D1
// https://opendata.arcgis.com/datasets/547a3ccb7ab443ceaaba62eef6694e74_4.geojson
async function restaurants() {
  axios({
    method: "GET",
    // url: "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1",
    url: "https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&order=asc",
    // url: https://developers.zomato.com/api/v2.1/search?entity_id=289&start=0&count=100&sort=rating&order=desc,
    headers: {
      "user-key": "9d76e594aa790973097bf60d5815e470",
      "content-type": "application/json"
    }
  })
    .then(response => {
      console.log(response.data.restaurants)
      const restaurantList = response.data.restaurants
      restGetData(restaurantList)
    })
    .catch(error => {
      console.log(error);
    });
}
// restaurants()

function restGetData(restaurantList) {
  let restContainer = document.querySelector('#rest-list') 
  restaurantList.forEach(restaurantList => {
    let newRes = document.createElement('div')
    newRes.classList.add('each-res')

    const restaurantData = `
    <h6>Name: ${restaurantList.restaurant.name}</h6> 
    <a href="${restaurantList.restaurant.photos_url}">photos</a>
    <a href="${restaurantList.restaurant.phone_numbers}">Call Us</a>
    <a href="${restaurantList.restaurant.url}">Website</a>
    <h6>Address: ${restaurantList.restaurant.location.address}</h6>
    `
    
    // console.log(restContainer)
   restContainer.appendChild(newRes)
   newRes.insertAdjacentHTML('beforeend', restaurantData)
    return restaurantData;
    
  })
  
}
const searchButton = document.querySelector('.rest-but');
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeRes()
    const inputVal = document.querySelector('.input-class').value  
    // console.log(inputVal)
    restaurants(inputVal)
    
  })

function removeRes() {
  const restsContainer = document.querySelector('#rest-list')
  while (restsContainer.lastChild)
    restsContainer.removeChild(restsContainer.lastChild)
}
