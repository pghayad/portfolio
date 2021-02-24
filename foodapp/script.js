'use strict';

/*
To Do:
  -duplicates in restaurants
    -due to the .click() being assigned inside of a function so it is being duplicately assigned
  -Add comments

  we just have to stop displayRes from having multiple calls

  NEWEST
  -if change city and cuisine, menu doesn't change
*/


let obj = {};
let cityID = 0;
let arr = [];

function start(){
  let city = $('#city').val();
  $('#getResBtn').attr('disabled', false);
  $('#res').empty();
  $('#menu').hide();
  fetch('https://developers.zomato.com/api/v2.1/cities?q='+city+'&apikey=6c0a010dda49b11057cb6ac76c9af0b6')
  .then(response => response.json())
  .then(responseJson => 
    getCityID(responseJson))
  .catch(error => alert('Please check your spelling and try again'));

}

function getCityID(responseJson){
  cityID = responseJson.location_suggestions[0].id
  getCuisines(cityID);
}

function getCuisines(cityID){
  fetch('https://developers.zomato.com/api/v2.1/cuisines?city_id='+cityID+'&apikey=6c0a010dda49b11057cb6ac76c9af0b6')
  .then(response => response.json())
  .then(responseJson => 
    displayCuisines(responseJson, cityID))
  .catch(error => alert('Please check your spelling and try again'));
}



function displayCuisines(responseJson, cityID){
  $('#cuisines').empty()
  for(let i = 0 ; i < responseJson.cuisines.length; i++){
    $('#cuisines').append("<option>" + responseJson.cuisines[i].cuisine.cuisine_name + "</option>")
    obj[responseJson.cuisines[i].cuisine.cuisine_name] = responseJson.cuisines[i].cuisine.cuisine_id;
  }
  
  console.log("here is the obj: " + obj)
}

$('#getResBtn').click(function(){
  let cuisine = $('#cuisines').val();
  let cuisine_id = obj[cuisine];

  $('#getResBtn').attr('disabled', true);


  console.log("city id: " + cityID + ", cuisineID: " + cuisine_id);

  getRes(cityID, cuisine_id);
})

function getRes(entityId, cuisineID){
  let entity_id = entityId;
  let entity_type = "city"
  let cuisine_id = cuisineID;
  
  
  $('#res').empty();
  fetch('https://developers.zomato.com/api/v2.1/search?entity_id='+entity_id+'&entity_type=city&count=35&cuisines='+cuisine_id+'&apikey=6c0a010dda49b11057cb6ac76c9af0b6')
  .then(response => response.json())
  .then(responseJson => 
    displayRes(responseJson))
  .catch(error => alert('Please check your spelling and try again'));

  $('#menu').show()
}

function displayRes(responseJson){
  console.log(responseJson.restaurants.length + " in here")
  for(let i = 0 ; i < responseJson.restaurants.length; i++){
      $('#res').append("<option>" + responseJson.restaurants[i].restaurant.name + "</option>");
      arr.push(
        {
          name: responseJson.restaurants[i].restaurant.name,
          id: responseJson.restaurants[i].restaurant.id
        }
      )
  }

  dispMenu(responseJson.restaurants[0].restaurant.id);
}
function dispMenu(res_id){
  fetch('https://developers.zomato.com/api/v2.1/restaurant?res_id='+res_id+'&apikey=6c0a010dda49b11057cb6ac76c9af0b6')
  .then(response => response.json())
  .then(responseJson => 
    $('#menu').attr('href', responseJson.menu_url))
  .catch(error => alert('Please check your spelling and try again'));
  $('#menu').show()
}

$('#cuisines').change(function(){
  $('#getResBtn').attr('disabled', false);
})

//changing restaurant selection
  $('#res').change(function(){
    for(let i = 0; i < arr.length; i++){
      if(this.value === arr[i].name){
        dispMenu(arr[i].id)
      }
    }
    
  })


//form submission
function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    start();
  });
}


//call the function
$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
});