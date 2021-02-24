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
  }else if(alt === "thinkful"){
  	desc.html("I currently work for Thinkful as a Computer Science Mentor.  I help students learn tech skills <br> in the fields of Web Development and Data Analytics.")
  }else if(alt === "chess"){
  	desc.html("I enjoy playing chess.")
  }else{
  	desc.html("Cats are calming.")
  }
});