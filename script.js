
async function restaurants() {
  axios({
    method: "GET",
    // url: "https://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1",
    url: "https://developers.zomato.com/api/v2.1/search?entity_id=289&entity_type=city&order=asc/https://developers.zomato.com/api/v2.1/search?entity_id=289&start=0&count=100&sort=rating&order=desc",
    // url: "https://developers.zomato.com/api/v2.1/search?entity_id=289&start=0&count=100&sort=rating&order=desc",
   
    headers: {
      "user-key": "9d76e594aa790973097bf60d5815e470",
      "content-type": "application/json"
    }
  }).then(response => {
      // console.log(response.data.restaurants)
      const restaurantList = response.data.restaurants
    restGetData(restaurantList)
    rateGetData(ratedList)
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
    <p>Cuisine: ${restaurantList.restaurant.cuisines}</p>
    <p>Hours: ${restaurantList.restaurant.timings}</p>
    <h6>Address: ${restaurantList.restaurant.location.address}</h6>
    ` // console.log(restContainer)
   restContainer.appendChild(newRes)
   newRes.insertAdjacentHTML('beforeend', restaurantData)
    return restaurantData;
    
  })
  
}
const searchButton = document.querySelector('.rest-but');
  searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeRestaurants()
    const searchValue = document.querySelector('#input-class').value
    // console.log(inputVal)
    restaurants(searchValue)
    
  })

function searchSel(restaurantList) {
    let input=document.querySelector('#input-class').value.toLowerCase();
    let output=document.querySelector('#realitems').options;
    for(let i=0;i<output.length;i++) {
      if(output[i].value.indexOf(input)==0){
        output[i].selected=true;
      }
      if(document.querySelector('#input-class').value==''){
        output[0].selected=true;
      }
    }
  }
//  searchSel() 
function removeRestaurants() {
  const restsContainer = document.querySelector('#rest-list')
  while (restsContainer.lastChild)
    restsContainer.removeChild(restsContainer.lastChild)
}

document.getElementById("copyright").appendChild(document.createTextNode(new Date().getFullYear()));