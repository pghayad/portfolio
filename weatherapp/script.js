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
  $('#current').append("Current temp: " + Math.round(data.main.temp) + "&#8457;<br>")
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
  let day = "";
  let ctr = 0;
  let d = new Date();
  let dayNum = d.getDay();

  //console.log("day: " + day)
  $('#weather').append("<h4>5 Day Forecast</h4>");

  //identify the days of the week
  for(let i = 0; i < data.list.length; i++){
    //report the weather at 6pm for each of next 5 days
    if(data.list[i].dt_txt.substring(11,13) === '18'){
      if(dayNum === 0){
        day = "Sun";
      }else if(dayNum === 1){
        day = "Mon";
      }else if(dayNum === 2){
        day = "Tue";
      }else if(dayNum === 3){
        day = "Wed";
      }else if(dayNum === 4){
        day = "Thu";
      }else if(dayNum === 5){
        day = "Fri";
      }else{
        day = "Sat";
      }
      $('#weather').append(data.list[i].dt_txt.substring(5,10) + ": " + "<b>" + Math.round(data.list[i].main.temp) + "&#8457;</b>" + "&nbsp;&nbsp;&nbsp;&nbsp;" + data.list[i].weather[0].main + "/" + data.list[i].weather[0].description + "<br>")
      console.log("dayNum: " + dayNum)
      if(dayNum === 6){
        dayNum = 0;
      }else{
        dayNum++;
      }
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