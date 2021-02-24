//keep global variables at a minimum
let imgCPU = $('#imgCPU');
let imgUser = $('#imgUser');
let result = $('#result');
let scoreUser1 = 0;
let scoreCPU1 = 0;

function submitUser(){
  let selUser = $('#selUser').val();
  let choice = 0;

  if(selUser === "Rock"){
    choice = 0;
    imgUser.attr('src', 'rock.jpg')
  }else if(selUser === "Paper"){
    choice = 1;
    imgUser.attr('src', 'paper.jpg')
  }else{
    choice = 2;
    imgUser.attr('src', 'scissors.jpeg')
  }

  $('#imgUser').show()
  submitCPU(choice)
}

function submitCPU(userChoice){
  let rand = Math.round(Math.random()*2);
  let selCPU = "";
  let scoreUser = $('#scoreUser');
  let scoreCPU = $('#scoreCPU');

  //CPU choices
  if(rand === 0){
    selCPU = "rock"
    imgCPU.attr('src', 'rock.jpg')
  }else if(rand === 1){
    selCPU = "paper"
    imgCPU.attr('src', 'paper.jpg')
  }else{
    selCPU = "scissors"
    imgCPU.attr('src', 'scissors.jpeg')
  }

  $('#selCPU').html(selCPU);
  imgCPU.show();

  if(rand === 0 && userChoice === 0 || rand === 1 && userChoice === 1 || rand === 2 && userChoice === 2){
    result.html("It's a draw!")
  }else if(rand === 0 && userChoice === 1){
    result.html("Paper covers Rock, You Win!")
    scoreUser1++;
    scoreUser.html(scoreUser1)
  }else if(rand === 0 && userChoice === 2){
    result.html("Rock smashes Scissors, CPU wins...")
    scoreCPU1++;
    scoreCPU.html(scoreCPU1)
  }else if(rand === 1 && userChoice === 0){
    result.html("Paper covers Rock, CPU wins...")
    scoreCPU1++;
    scoreCPU.html(scoreCPU1)
  }else if(rand === 1 && userChoice === 2){
    result.html("Scissors cuts Paper, You Win!")
    scoreUser1++;
    scoreUser.html(scoreUser1)
  }else if(rand === 2 && userChoice === 0){
    result.html("Rock smashes Scissors, You Win!")
    scoreUser1++;
    scoreUser.html(scoreUser1)
  }else if(rand === 2 && userChoice === 1){
    result.html("Scissors cuts Paper, CPU wins...")
    scoreCPU1++;
    scoreCPU.html(scoreCPU1)
  }

  result.show();
  $('#playAgainBtn').attr('disabled', false)
  $('#submitBtn').attr('disabled', true)
}

function playAgain(){
  //hide the images, enable submit, disable play again
  imgCPU.hide();
  imgUser.hide();
  result.hide();
  $('#playAgainBtn').attr('disabled', true)
  $('#submitBtn').attr('disabled', false)
}