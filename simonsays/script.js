/*
  Simon Says by Paul Ghayad
  Start Date: Apr 15th 2021
  End Date: Apr 20th, 2021


  Psuedocode:
    -click play game
    -after pattern over, display question, input field, and submit btn
    -on submit, if correct, disable submit btn
    -when user clicks
*/
  
  $( function() {
    var state = true;
    
    $( "#playBtn" ).on( "click", function() {
      $('#q').hide();
      $( "#playBtn" ).attr('disabled', true);

      if ( state ) {

        setTimeout(function(){
          $( "#effect1" ).animate({
            backgroundColor: "green",
            color: "#fff",
          }, 1000 );
          $( "#effect1" ).animate({
            backgroundColor: "#fff",
            color: "#000",
          }, 1000 );
        }, 2000)

        //red 1st
        $( "#effect" ).animate({
          backgroundColor: "red",
          color: "#fff",
        }, 1000 );
        $( "#effect" ).animate({
          backgroundColor: "#fff",
          color: "#000",
        }, 1000 );

      setTimeout(function(){
          $( "#effect2" ).animate({
            backgroundColor: "blue",
            color: "#fff",
          }, 1000 );
          $( "#effect2" ).animate({
            backgroundColor: "#fff",
            color: "#000",
          }, 1000 );
        }, 4000)

        setTimeout(function(){
        $( "#effect3" ).animate({
          backgroundColor: "yellow",
          color: "#fff",
        }, 1000 );
        $( "#effect3" ).animate({
          backgroundColor: "#fff",
          color: "#000",
        }, 1000 );
        }, 6000);

      } else {
        $( "#effect" ).animate({
          backgroundColor: "#fff",
          color: "#000",
        }, 1000 );
        $( "#effect1" ).animate({
          backgroundColor: "#fff",
          color: "#000",
        }, 1000 );
      }
      //state = !state;
      $('#submitBtn').attr('disabled', false);
      setTimeout(function(){
        ask();
      }, 7000);
    });
  } );

  function ask(){
    $('#q').show(); //display question, input, and submit btn after pattern has been shown

  }

  function submit(){
    let val = $('#val').val()

    if(val === 'rgby'){
      alert('that is correct!')
      $('#submitBtn').attr('disabled', true);
      $('#playBtn').attr('disabled', false);
    }else{
      alert('try again...')
    }

    $('#val').val('');
  }