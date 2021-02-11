$('.thumbnail').on('click', e => {
  //these are the src and alt attributes of the thumbnail
  let src = e.target.src;
  let alt = e.target.alt;

  //replace the main image's src and alt attributes with the thumbnail's
  $('.hero').children().attr('src', src)
  $('.hero').children().attr('alt', alt)
});
