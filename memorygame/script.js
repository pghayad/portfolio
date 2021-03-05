let board = $('#board')

  let src1 = 'https://vignette.wikia.nocookie.net/nintendo/images/d/d8/New_Super_Mario_Bros._U_Deluxe_-_Mario_01.png/revision/latest/top-crop/width/360/height/450?cb=20181226204245&path-prefix=en'

  let src2 = 'https://vignette.wikia.nocookie.net/nintendo/images/0/04/New_Super_Mario_Bros._U_Deluxe_-_Luigi_01.png/revision/latest?cb=20181226204244&path-prefix=en'

  let src3 = 'https://vignette.wikia.nocookie.net/mariofanon/images/a/ac/Princess_Peach_with_a_ponytail_from_Mario_Kart_series_and_Super_Mario_64_DS.png/revision/latest/scale-to-width-down/340?cb=20180910163104'

  let src4 = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Wario.png/250px-Wario.png'

  let src5 = 'https://www.mariowiki.com/images/thumb/b/b5/SuperMarioParty_DonkeyKong.png/250px-SuperMarioParty_DonkeyKong.png'

  let src6 = 'https://play.nintendo.com/images/Masthead_Bowser.17345b1513ac044897cfc243542899dce541e8dc.9afde10b.png'

  let src7 = 'https://images-na.ssl-images-amazon.com/images/I/81itdej9OJL._AC_SY879_.jpg'

  let src8 = 'https://www.mariowiki.com/images/5/54/Yoshiapplealt.svg'

  let srcs = [src1, src2, src3, src4, src5, src6, src7, src8, src1, src2, src3, src4, src5, src6, src7, src8]

  let idx = Math.round(Math.random()*(srcs.length-1))

  let counter = 0;

  let arr = [], arrId = [];

  let index = 0;

  //create the board
  function init(){
    
    for(let i = 1; i <= 16; i++){
      if(i === 1 || i === 5 || i === 9 || i === 13){
        board.append("<br>")
      }
      idx = Math.round(Math.random()*(srcs.length-1))
      $('#board').append(`<button id="${i}" onclick='reveal(this)'>-<img src="${srcs[idx]}" hidden></button>`)

      srcs.splice(idx, 1)
    }
    
  }

  //x is the HTML element
  function reveal(x){
    let source1 = $(x).children().attr('src');
    let id = $(x).attr('id')
    
    arr.push(source1)
    arrId.push(id)

    $(x).children().slideToggle()
    $(x).children().addClass('showing')

    //if theres a match...
    if(arr.length === 2 && arr[0] === arr[1]){
      alert('thats a match!')
      counter++;
      //figure out how to disable both buttons
      $(x).attr('disabled', true);  //2nd button
      $('#'+arrId[0]).attr('disabled', true);
      arr = []
      arrId = [];
    }else if(arr.length === 2 && arr[0] !== arr[1]){
      console.log("No Match")
      $(x).children().slideToggle(3000);
      $('#'+arrId[0]).children().slideToggle(2500);
      arr = []
      arrId = [];
    }
      
      $(x).children().attr('src', source1); 

      if(counter === 8){
        alert("you won the game! refresh page to play again.")
      }
    }

     

  function clearBoard(){

  }

  $(init)