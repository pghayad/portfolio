/*
  Five-Card Draw Video Poker by Paul Ghayad
  March 31st 2021

  Data validation for bet amount. cannot bet if amount is greater than my chips

*/
let ranks = [2,3,4,5,6,7,8,9,'T','J','Q','K','A'];
let suits = ['♣','♦','♥','♠'];
let myHand = [], myHandBeg = [], myHandEnd = [], arrH = [];
let arrNum = [];
let deck = [];
let isBlue = false;
let val = "";
let discards = [];
let chips = 100, bet = 0, chipsTemp = 0;

/*
clubs (♣), diamonds (♦), hearts (♥), and spades (♠). 
*/
function createDeck(){
  for(let i = 0; i < ranks.length; i++){
    for(let j = 0; j < suits.length; j++){
      deck.push(ranks[i] + suits[j]);
    }
  }
}

function deal(){
  let rand = Math.round(Math.random()*(deck.length-1));
  let card = deck.splice(rand,1).join();

  //add chips to UI
  $('#chips').html(chips)

  for(let i = 0; i < 5; i++){
    myHandBeg.push(card);
    myHandEnd.push(card)
    $('#cards').append('<button id="'+i+'"type="button" class="btn btn-lg card">' + card + '</button>')
    rand = Math.round(Math.random()*(deck.length-1));
    card = deck.splice(rand,1).join();
  }

    $('.card').click(function(){
    val = $(this);
    //creating my own toggle with the highlighting of the cards

    if(val.hasClass('highlight')) {
      val.removeClass('highlight')
    }else{
      val.addClass('highlight')
    }
  })

  
}

  function submit(){
    bet = parseInt($("#bet option:selected" ).text());

    //data validation for bet amount
    if(bet > chips){
      alert("bet amount greater than chips. choose smaller bet amount")
    }else{
      chips -= bet;
      $('#chips').html(chips)
      $('#bet').attr('disabled', true);
      $('#swapBtn').attr('disabled', false);
      //$('.highlight').remove();
      $('#cards').show();
      $('#submitBtn').attr('disabled', true)
    }
  }

function swap(){
  arrH = $('.highlight');
  let arr = [];
  let rand = Math.round(Math.random()*(deck.length-1));
  let card = deck.splice(rand,1).join();
  let x = ""

  //swap highlighted cards
  for(let i = 0; i < arrH.length; i++){
    arr.push(arrH[i].innerHTML)
    arrH[i].remove(".highlight")
    myHand.push(card);
    myHandEnd.push(card)
    
    $('#cards').append('<button id="" type="button" class="btn btn-lg card highlight">' + card + '</button>')
    rand = Math.round(Math.random()*(deck.length-1));
    card = deck.splice(rand,1).join();
  }


  $('.card').attr('disabled', true);
  $('#swapBtn').attr('disabled', true);

  for(let i = 0; i < myHandBeg.length; i++){
    for(let j = 0; j < arr.length; j++){
      if(arr[j] === myHandBeg[i]){
        myHandBeg.splice(i, 1);
      }
    }

  }
  for(let i = 0; i < myHand.length; i++){
    myHandBeg.push(myHand[i])
  }

  myHandEnd = myHandBeg;
  evalHand(myHandEnd)
}

function convertNum(myHandEnd){
  for(let i = 0; i < myHandEnd.length; i++){
    if(myHandEnd[i].charAt(0) === 'T'){
      arrNum.push(10);
    }else if(myHandEnd[i].charAt(0) === 'J'){
      arrNum.push(11);
    }else if(myHandEnd[i].charAt(0) === 'Q'){
      arrNum.push(12);
    }else if(myHandEnd[i].charAt(0) === 'K'){
      arrNum.push(13);
    }else if(myHandEnd[i].charAt(0) === 'A'){
      arrNum.push(14);
    }else{
      arrNum.push(parseInt(myHandEnd[i].charAt(0)))
    }
  }

  arrNum.sort(function(a, b){return a - b});
  console.log(arrNum)
  return arrNum;
}

function evalHand(myHandEnd){
  let card0 = myHandEnd[0];
  let card1 = myHandEnd[1];
  let card2 = myHandEnd[2];
  let card3 = myHandEnd[3];
  let card4 = myHandEnd[4];
  let hasStraight = false;

  //logic for the straight
  let arrNum = convertNum(myHandEnd);
  if((arrNum[0] === arrNum[1]-1 && arrNum[1] === arrNum[2]-1 && arrNum[2] === arrNum[3]-1 &&
    arrNum[3] === arrNum[4]-1) || (arrNum[0] === 2 && arrNum[1] === 3 && arrNum[2] === 4 &&
    arrNum[3] === 5 && arrNum[4] === 14)){
      hasStraight = true;
    }

  //royal flush

  //straight flush that's not royal

  //4 of a kind
  if((card0.charAt(0) === card1.charAt(0) && card0.charAt(0) === card2.charAt(0) &&
      card0.charAt(0) === card3.charAt(0) ) ||
    (card0.charAt(0) === card1.charAt(0) && card0.charAt(0) === card2.charAt(0) &&
      card0.charAt(0) === card4.charAt(0) ) ||
    (card1.charAt(0) === card2.charAt(0) && card1.charAt(0) === card3.charAt(0) &&
      card1.charAt(0) === card4.charAt(0) )
    ){
    $('#hand').html("<h2>You Have: 4 of a Kind</h2>")
    chips += bet*26;
  }
  //full house
  else if((card0.charAt(0) === card1.charAt(0) && card2.charAt(0) === card3.charAt(0) && card2.charAt(0) === card4.charAt(0)) || 
    (card0.charAt(0) === card2.charAt(0) && card1.charAt(0) === card3.charAt(0) && card1.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card3.charAt(0) && card1.charAt(0) === card2.charAt(0) && card1.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card4.charAt(0) && card1.charAt(0) === card2.charAt(0) && card1.charAt(0) === card3.charAt(0)) ||

    (card1.charAt(0) === card2.charAt(0) && card0.charAt(0) === card3.charAt(0) && card0.charAt(0) === card4.charAt(0)) ||
    (card1.charAt(0) === card3.charAt(0) && card0.charAt(0) === card2.charAt(0) && card0.charAt(0) === card4.charAt(0)) ||
    (card1.charAt(0) === card4.charAt(0) && card0.charAt(0) === card2.charAt(0) && card0.charAt(0) === card3.charAt(0)) ||

    (card2.charAt(0) === card3.charAt(0) && card0.charAt(0) === card1.charAt(0) && card0.charAt(0) === card4.charAt(0)) ||
    (card2.charAt(0) === card4.charAt(0) && card0.charAt(0) === card1.charAt(0) && card0.charAt(0) === card3.charAt(0)) ||

    (card3.charAt(0) === card4.charAt(0) && card0.charAt(0) === card1.charAt(0) && card0.charAt(0) === card2.charAt(0))
  ){
    chips += bet*3;
    $('#hand').html("<h2>You Have: a Full House</h2>")
  }
  //flush
  else if(card0.charAt(1) === card1.charAt(1) && card0.charAt(1) === card2.charAt(1) && 
      card0.charAt(1) === card3.charAt(1) && card0.charAt(1) === card4.charAt(1)
    ){
    $('#hand').html("<h2>You Have: A Flush</h2>")
    chips += bet*7;
  }
  //straight
  else if(hasStraight){
    $('#hand').html("<h2>You Have: A Straight</h2>")
    chips += bet*5;
  }

  //3 of a kind
  else if((card0.charAt(0) === card1.charAt(0) && card0.charAt(0) === card2.charAt(0)) || 
      (card0.charAt(0) === card1.charAt(0) && card0.charAt(0) === card3.charAt(0)) ||
    (card0.charAt(0) === card1.charAt(0) && card0.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card2.charAt(0) && card0.charAt(0) === card3.charAt(0)) ||
    (card0.charAt(0) === card2.charAt(0) && card0.charAt(0) === card4.charAt(0)) ||
    (card1.charAt(0) === card2.charAt(0) && card1.charAt(0) === card3.charAt(0)) ||
    (card1.charAt(0) === card2.charAt(0) && card1.charAt(0) === card4.charAt(0)) ||
    (card2.charAt(0) === card3.charAt(0) && card2.charAt(0) === card4.charAt(0))
  ){
    chips += bet*4;
    $('#hand').html("<h2>You Have: 3 of a Kind</h2>")
  }
  //2 pair
  else if((card0.charAt(0) === card1.charAt(0) && card2.charAt(0) === card3.charAt(0)) || 
    (card0.charAt(0) === card1.charAt(0) && card2.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card1.charAt(0) && card3.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card2.charAt(0) && card1.charAt(0) === card3.charAt(0)) ||
    (card0.charAt(0) === card2.charAt(0) && card1.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card2.charAt(0) && card3.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card3.charAt(0) && card1.charAt(0) === card2.charAt(0)) ||
    (card0.charAt(0) === card3.charAt(0) && card1.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card3.charAt(0) && card2.charAt(0) === card4.charAt(0)) ||
    (card0.charAt(0) === card4.charAt(0) && card1.charAt(0) === card2.charAt(0)) ||
    (card0.charAt(0) === card4.charAt(0) && card1.charAt(0) === card3.charAt(0)) ||
    (card0.charAt(0) === card4.charAt(0) && card2.charAt(0) === card3.charAt(0)) ||
    (card1.charAt(0) === card2.charAt(0) && card3.charAt(0) === card4.charAt(0)) ||
    (card1.charAt(0) === card4.charAt(0) && card2.charAt(0) === card3.charAt(0))
  ){
    chips += bet*3;
    $('#hand').html("<h2>You Have: Two Pair</h2>")
  }
  //1 pair
  else if(card0.charAt(0) === card1.charAt(0) || card0.charAt(0) === card2.charAt(0) || 
      card0.charAt(0) === card3.charAt(0) || card0.charAt(0) === card4.charAt(0) ||
    card1.charAt(0) === card2.charAt(0) || card1.charAt(0) === card3.charAt(0) ||
    card1.charAt(0) === card4.charAt(0) || card2.charAt(0) === card3.charAt(0) ||
    card2.charAt(0) === card4.charAt(0) || card3.charAt(0) === card4.charAt(0)
  ){
    chips += bet*2;
    $('#hand').html("<h2>You Have: One Pair</h2>")
  }else{
    $('#hand').html("<h2>You Have: Nothing...</h2>")
  }

  //when run out of chips, show Start Over button
  if(chips === 0){
    $('#playAgainBtn').show();
    $('#resetBtn').hide();
  }else{
    $('#chips').html(chips)
    $('#resetBtn').show();
  }
  
  
}

// function clickBtn(btn){
//   console.log(btn)
// }

 function reset(){
    $('#bet').attr('disabled', false);
    $('#submitBtn').attr('disabled', false);
    $('#swapBtn').attr('disabled', true);
    //$('.highlight').remove();
    $('#cards').hide();
    $('#cards').empty();
    $("#hand").html("");
    $('#resetBtn').hide();
    arrH = [];
    myHand = [];
    myHandBeg = [];
    myHandEnd = [];
    deck = [];
    createDeck();
    deal();
 }

 function playAgain(){
   location.reload();
 }

$(document).ready(function(){

  
  $('#cards').hide();
})



createDeck();
deal()