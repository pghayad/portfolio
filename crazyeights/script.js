/*
  Crazy Eights, by Paul Ghayad
  Start Date: April 6th, 2021
  End Date: April 9th, 2021

  Fixes:
    -if deck is empty, shuffle played cards and put same card on top

*/
let ranks = [2,3,4,5,6,7,8,9,'T','J','Q','K','A'];
let suits = ['♣','♦','♥','♠'];
let handCPU = [];
let deck = [];
let val = "";
let discards = [];
let chips = 100, bet = 0, chipsTemp = 0;
let topCard = "", card = "";
let rand = 0;
let isEight = false;
let suit = "";
let playedCards = [];
let handUser = [];

/*
clubs (♣), diamonds (♦), hearts (♥), and spades (♠). 
*/
function createDeck(){
  for(let i = 0; i < ranks.length; i++){
    for(let j = 0; j < suits.length; j++){
      deck.push(ranks[i] + suits[j]);
    }
  }

  playedCards = deck;
}

function deal(){
  rand = Math.round(Math.random()*(deck.length-1));
  card = deck.splice(rand,1).join();
  topCard = deck.splice(rand,1).join();
  

  //if top card is an 8, pick another top card
  while(topCard.charAt(0) === '8'){
    rand = Math.round(Math.random()*(deck.length-1));
    topCard = deck.splice(rand,1).join();
  }

  for(let i = 0; i < 5; i++){
    //deal User's hand
    $('#cards').append('<button id="'+i+'" type="button" onclick="play(this)" class="btn btn-lg card">' + card + '</button>');
    //handUser.push(card);
    rand = Math.round(Math.random()*(deck.length-1));
    card = deck.splice(rand,1).join();

    //deal CPU's hand
    handCPU.push(card);
    rand = Math.round(Math.random()*(deck.length-1));
    card = deck.splice(rand,1).join();
  }

  console.log(handCPU)
  $('#topCard').html('<button disabled id="" type="button" class="btn btn-lg card">' + topCard + '</button>');
  playedCards = deck;
  console.log("played cards: " + playedCards);
}

function play(val){ 
  //Data Validation: determine if clicked card is playable
  let valDOM = $(val);

  //if User plays an 8
  if(val.innerHTML.charAt(0) === '8'){
    suit = prompt("Which suit? (type s, c, d, or h)");

    //account for invalid entry into prompt
    while(suit !== "s" && suit !== "c" && suit !== 'd' && suit !== 'h'){
      suit = prompt("Invalid entry. Which suit? (type s, c, d, or h)");
    }

    //['♣','♦','♥','♠'];
    if(suit === 's'){
      $('#flag').html("Suit is now spades.  Waiting for CPU...")
      suit = '♠'
    }else if(suit === 'd'){
      $('#flag').html("Suit is now diamonds.  Waiting for CPU...")
      suit = '♦'
    }else if(suit === 'h'){
      $('#flag').html("Suit is now hearts.  Waiting for CPU...")
      suit = '♥'
    }else if(suit === 'c'){
      $('#flag').html("Suit is now clubs.  Waiting for CPU...")
      suit = '♣'
    }

    topCard = val.innerHTML;
    $('#topCard').html(val);
    playedCards.push(topCard)
    isEight = true;

    console.log("played cards: " + playedCards);

    setTimeout(function(){
      //now CPU's turn
      isEight = true;
      $('#flag').show()
      playCPU(isEight, suit);   //CPU's turn, after User plays an eight
      
    }, 3000)
    

  //if User plays an invalid card
  }else if(val.innerHTML.charAt(1) !== topCard.charAt(1) && val.innerHTML.charAt(0) !== topCard.charAt(0)){
    alert("invalid card! need matching suit or matching rank")

  }else{  //if valid card, other than an 8, is played by the User
    topCard = val.innerHTML;
    $('#topCard').html(val);
    playedCards.push(topCard)
    $('#flag').html("Waiting for CPU...")
    $('#flag').show();
    suit = val.innerHTML.charAt(1);

    setTimeout(function(){
      //now CPU's turn
      isEight = false;
      playCPU(isEight, suit);
    }, 3000)
    
  }

  //game over
  if ( $('#cards').children().length === 0 ) {
     alert("Game Over. You Win!")
     $('#playAgainBtn').show();
     $('#drawBtn').attr('disabled', true)
  }
  console.log("val: " + val.innerHTML)
}

//CPU's move
function playCPU(isEight, suit){
  let played = false;
  let random = Math.round(Math.random()*(3));
  let suits = ['♣','♦','♥','♠'];
  let suitCPU = suits[random];

  //how CPU responds to User playing an 8
  if(isEight){
    for(let i = 0; i < handCPU.length; i++){
      if(handCPU[i].charAt(0) === '8'){   //if CPU plays an 8
        //To Do Eventually: Advanced CPU Logic
        //For Now: CPU changes the suit randomly.
        $('#flag').html("CPU has changed the suit to " + suitCPU + ". Your turn.");
        topCard = 'x' + suitCPU;
        suit = suitCPU;
        $('#topCard').html(handCPU[i]); 
        playedCards.push(handCPU[i])
        handCPU.splice(i, 1);//remove card from CPU's hand
        played = true;
        break;
      }else if(handCPU[i].charAt(1) === suit){  //CPU can play a card of the new suit
        $('#topCard').html(handCPU[i]); 
        $('#flag').html("CPU has played a card.  Your turn.")
        topCard = handCPU[i];
        playedCards.push(topCard)
        handCPU.splice(i, 1);//remove card from CPU's hand
        
        played = true;
        break;
      }else{  //CPU cannot play a card

      }
    }

  //if User plays something other than an 8
  }else{
    for(let i = 0; i < handCPU.length; i++){
      if(handCPU[i].charAt(0) === '8'){   //if CPU has an 8
        //To Do Eventually: Advanced CPU Logic
        //For Now: CPU changes the suit randomly.
        $('#flag').html("CPU has changed the suit to " + suitCPU + ". Your turn.");
        suit = suitCPU;
        topCard = 'x' + suitCPU;
        $('#topCard').html(handCPU[i]); 
        playedCards.push(handCPU[i])
        handCPU.splice(i, 1);//remove card from CPU's hand
        played = true;
        break;
      }else if(handCPU[i].charAt(0) === topCard.charAt(0) || handCPU[i].charAt(1) === topCard.charAt(1)){
        console.log("CPU is playing: " + handCPU[i])
        console.log("in here")
        $('#flag').html("CPU has played a card.  Your turn.")
        $('#topCard').html(handCPU[i]); //make top card the card CPU is playing
        topCard = handCPU[i]
        playedCards.push(topCard)
        handCPU.splice(i, 1);//remove card from CPU's hand
        
        played = true;
        break;
      }
    }
  }
  


  
  rand = Math.round(Math.random()*(deck.length-1));
  card = deck.splice(rand,1).join();

  //if no playable card found, draw a card and try the algorithm again.
  console.log("played: " + played)
  if(!played){
    handCPU.push(card);
    playCPU(isEight, suit);
  }

  //game over
  if (handCPU.length === 0) {
     alert("Game Over. CPU Wins...")
     $('#playAgainBtn').show();
     $('#drawBtn').attr('disabled', true)
  }
  console.log("CPU hand: " + handCPU);
}

function draw(){
  playedCards = deck;

  if(deck.length === 0){
    alert("Deck is empty.  Shuffling...")
  }else{
    rand = Math.round(Math.random()*(deck.length-1)); 
    card = deck.splice(rand,1).join();
    $('#cards').append('<button onclick="play(this)" class="btn btn-lg card">' + card + '</button>')
  }
}

function playAgain(){
  location.reload();
}

$(document).ready(function() {
    createDeck();
    deal();
});
