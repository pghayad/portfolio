  //declare global variables
  let deck = []
  let suits = ["d", "s", "h", "c"]
  let ranks = [2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"]

  let handUser = [], handCPU = []
  let cardsUser = [], cardsCPU = []
  let numUser = 26, numCPU = 26;
  let first = 0;
  let mix = [];


  function createDeck(){
      for(let i = 0; i < suits.length; i++){
        for(let j = 0; j < ranks.length; j++){
          deck.push(ranks[j] + suits[i])
        }
      }
  }

  function deal(){
    let rand = Math.round(Math.random()*(deck.length-1))

    //deal cards
    for(let i = 0; i < 26; i++){
      rand = Math.round(Math.random()*(deck.length-1))
      cardsUser.push(deck.splice(rand, 1))
      rand = Math.round(Math.random()*(deck.length-1))
      cardsCPU.push(deck.splice(rand, 1))
    }
    
  }

  function play(){
    handUser = cardsUser.shift();
    handCPU = cardsCPU.shift();
    mix.push(handUser)
    mix.push(handCPU)
    console.log('Hand User: ' + handUser)
    console.log('Hand CPU: ' + handCPU)
    
    let rankUser = mapRank(handUser[0][0])
    let rankCPU = mapRank(handCPU[0][0])
    console.log("rank user: " + rankUser + ", rank CPU: " + rankCPU)

    //show user and cpu hands
    $('#handUser').append(handUser).attr('hidden',true)
    $('#handUser').slideDown(3000)
    
    $('#handCPU').append(handCPU).attr('hidden',true)
    $('#handCPU').slideDown(3000)

    //user wins
    if(rankUser > rankCPU){
      $('#msg').html('You win!')
      $('#msg').slideDown(3000)
      cardsUser.push(handUser);
      cardsUser.push(handCPU);
      $('#numUser').html(cardsUser.length);
      $('#numCPU').html(cardsCPU.length);
      $('#playBtn').attr('disabled', true);
      $('#contBtn').attr('disabled', true);
      $('#nhBtn').attr('disabled', false);
      mix = []
    }
    //CPU wins
    else if(rankUser < rankCPU){
      $('#msg').html('CPU wins...')
      $('#msg').slideDown(3000)
      cardsCPU.push(handUser);
      cardsCPU.push(handCPU);
      $('#numUser').html(cardsUser.length);
      $('#numCPU').html(cardsCPU.length);
      $('#playBtn').attr('disabled', true);
      $('#contBtn').attr('disabled', true);
      $('#nhBtn').attr('disabled', false);
      mix = []
    }


    //war: deal 3 cards face down for each player, and then one card face up
    //if the 2 face ups are equal, then repeat: 3 card downs, 1 card up
    //once a player wins, they receive all of the cards used in the hand
    else{
        $('#msg').html('It is time for war.')
        $('#msg').slideDown(3000)
        $('#playBtn').attr('disabled', true)
        $('#contBtn').attr('disabled', false)
    }
      $('#numUser').html(cardsUser.length);
      $('#numCPU').html(cardsCPU.length);

      if(cardsUser.length === 0){
          alert("game over, CPU wins...")
        }

      if(cardsCPU.length === 0){
        alert("game over, You Win!")
      }
  }
  

  function mapRank(rank){
    if(rank === 'T'){
      return 10;
    }else if(rank === 'J'){
      return 11;
    }else if(rank === 'Q'){
      return 12;
    }else if(rank === 'K'){
      return 13;
    }else if(rank === 'A'){
      return 14;
    }else{
      return parseInt(rank);
    }
  }

  function cont(){
        console.log(first)

        //add 3 cards face down from each player to the mix
        for(let i = 0; i < 3; i++){
          mix.push(cardsUser.shift())
          mix.push(cardsCPU.shift())
        }

        //compare 4th cards. reassign handUser
        handUser = cardsUser.shift();
        handCPU = cardsCPU.shift();
        mix.push(handUser);
        mix.push(handCPU);

        
        $('#warCards').append("User / CPU<br>")
        $('#warCards').append(handUser + " / " + handCPU + "<br>").attr('hidden', true)
        $('#warCards').slideDown(3000)

        rankUser = mapRank(handUser[0][0])
        rankCPU = mapRank(handCPU[0][0])

        //add mix to winning cards
        if(rankUser > rankCPU){
          console.log('You won a total of ' + mix.length + ' cards!')
          for(let i = 0; i < mix.length; i++){
            cardsUser.push(mix[i])
          }
          $('#playBtn').attr('disabled', true);
          $('#contBtn').attr('disabled', true);
          $('#nhBtn').attr('disabled', false);
          mix = []
        }else if(rankUser < rankCPU){
          console.log('CPU won a total of ' + mix.length + ' cards...')
          console.log("cards CPU: " + cardsCPU.length)
          for(let i = 0; i < mix.length; i++){
            cardsCPU.push(mix[i])
          }  
          
          $('#playBtn').attr('disabled', true);
          $('#contBtn').attr('disabled', true);
          $('#nhBtn').attr('disabled', false);
          mix = []
        }else{
          first++;
          $('#playBtn').attr('disabled', true);
          $('#contBtn').attr('disabled', false);
          $('#nhBtn').attr('disabled', true);
        }

        $('#numUser').html(cardsUser.length);
        $('#numCPU').html(cardsCPU.length);

        //winning conditions
        if(cardsUser.length === 0){
          alert("game over, CPU wins...")
        }

        if(cardsCPU.length === 0){
          alert("game over, You Win!")
        }
        
  }

  function nextHand(){
    $('#playBtn').attr('disabled', false);
    $('#contBtn').attr('disabled', true);
    $('#nhBtn').attr('disabled', true);
    
    $('#warCards').html("")
    $('#handUser').html("")
    $('#handCPU').html("")
    $('#msg').hide()
  }

  createDeck()
  deal()

  //mix needs to be 10 cards