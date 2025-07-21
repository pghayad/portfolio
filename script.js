$('.thumbnail').on('click', e => {
  //these are the src and alt attributes of the thumbnail
  let src = e.target.src;
  let alt = e.target.alt;
  let desc = $('#description')

  //replace the main image's src and alt attributes with the thumbnail's
  $('.hero').children().attr('src', src)
  $('.hero').children().attr('alt', alt)

  if(alt === "tennis"){
  	desc.html("Tennis is one of my all-time favorite sports.  I am actually a USPTA Certified Tennis Instructor. <br>I play about once or twice per week. When the weather is nice, you can find me outside on a <br>court. Tennis is so great because it is for people of all ages and is a great workout.")
  }else if(alt === "cdata"){
  	desc.html("I am currently a Technology Evangelist at CData Software, Inc.  I create videos and web pages to help clients understand and use our software.  It has been quite the enjoyable experience thus far.")
  }else if(alt === "chess"){
  	desc.html("I enjoy playing chess. I am ranked within the top 3rd percentile on chess.com!")
  }else{
  	desc.html("Cats are calming. I have always wanted to own a cat, but playing with my friends' pets is enough for me.")
  }
});

// const contactForm = document.querySelector("#contact-form")
// contactForm.addEventListener('submit', function(event){
//   event.preventDefault();
//   console.log(event.target.name.value)
// })

function initialize(){
  fetch("http://localhost:3000/animals")
  .then(response => response.json())
  .then(animalArray => {
    console.log(animalArray)
    renderAllAnimals(animalArray)
  })
}

function renderAllAnimals(animals){
  let p = document.createElement('p')
  for(let i = 0; i < animals.length; i++){
    p = document.createElement('p')
    p.innerHTML = animals[i].name
    document.querySelector("#test").append(p)
  }
}

initialize()