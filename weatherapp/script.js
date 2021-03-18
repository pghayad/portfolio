'use strict';

//http://api.openweathermap.org/data/2.5/weather?q=paris&units=imperial&appid=ef01095af7db393fb4e616c0fd670ab3

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
function search(){
  let zip = $('#zip').val();

  if(zip.charAt(0) >= '0' && zip.charAt(0) <= '9'){
      fetch('https://api.openweathermap.org/data/2.5/forecast?zip='+ zip + ',us&units=imperial&appid=ef01095af7db393fb4e616c0fd670ab3')
    .then(response => response.json())
    .then(responseJson => 
      getWeather(responseJson))
    .catch(error => alert('Please check your spelling and try again'));

    fetch('https://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&units=imperial&appid=ef01095af7db393fb4e616c0fd670ab3')
    .then(response => response.json())
    .then(responseJson => 
      current(responseJson))
    .catch(error => alert('Please check your spelling and try again'));
  }else{
    fetch('https://api.openweathermap.org/data/2.5/forecast?q='+ zip + '&units=imperial&appid=ef01095af7db393fb4e616c0fd670ab3')
      .then(response => response.json())
      .then(responseJson => 
        getWeather(responseJson))
      .catch(error => alert('Please check your spelling and try again'));

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + zip + '&units=imperial&appid=ef01095af7db393fb4e616c0fd670ab3')
      .then(response => response.json())
      .then(responseJson => 
        current(responseJson))
      .catch(error => alert('Please check your spelling and try again'));
  }
  
}

function current(data){
  //console.log(data)
  $('#current').empty();
  $('#current').append("Current temp: " + data.main.temp + "<br>")
  $('#current').append(data.weather[0].main + "/" + data.weather[0].description + "<br><br>");
  $('#title').html("Weather for " + data.name + ", " + data.sys.country)
  $('#title').show()
}

function getWeather(data){
  $('#weather').empty();
  //console.log(data)
  console.log(data.list)
  $('#title').html("Weather for " + data.city.name + ", " + data.city.country)
  $('#title').show()

  $('#weather').append("<h4>5 Day Forecast</h4>");
  for(let i = 0; i < data.list.length; i++){
    if(data.list[i].dt_txt.substring(11,13) === '18'){
      $('#weather').append(data.list[i].dt_txt.substring(0,10) + ": " + data.list[i].main.temp + "&nbsp;&nbsp;&nbsp;&nbsp;" + data.list[i].weather[0].main + "/" + data.list[i].weather[0].description + "<br>")
    }
    
  }
}

function popular(data){
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + data.innerHTML + '&units=imperial&appid=ef01095af7db393fb4e616c0fd670ab3')
      .then(response => response.json())
      .then(responseJson => 
        current(responseJson))
      .catch(error => alert('Please check your spelling and try again'));
  
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + data.innerHTML + '&units=imperial&appid=ef01095af7db393fb4e616c0fd670ab3')
      .then(response => response.json())
      .then(responseJson => 
        getWeather(responseJson))
      .catch(error => alert('Please check your spelling and try again'));
}


//form submission
function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    search();
  });
}


//Start Here.
$(function() {
  let d = new Date();
  let monthDay = d.toString().substring(4, 10);
  
  //show icons for all the different holidays
  if(monthDay === "Mar 17"){
    $('#stpattys').show();
  }else{
    $('#stpattys').hide();
  }
  watchForm();
});