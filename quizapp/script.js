/*
  To Do:
    -take care of when the last question is wrong, i.e. disable/enable buttons
    -running total of correct answers and total answers
    -some css signal that answer is correct or incorrect
    -clean up the code. i'm currently doing that
*/
let firstAns = "button1";
let data = [
  {
    question: "What is the capital of Pennsylvania?",
    button0: "Philadelphia",
    button1: "Harrisburg",
    button2: "Lancaster",
    correct: "button1"
  },
  {
    question: "How many inches are in 5.5 feet?",
    button0: 55,
    button1: 50,
    button2: 66,
    correct: "button2"
  },
  {
    question: "Who wrote Animal Farm?",
    button0: "Aldous Huxley",
    button1: "William Shakespeare",
    button2: "George Orwell",
    correct: "button2"
  },  
  {
    question: "What is the capital of New Jersey?",
    button0: "Trenton",
    button1: "Princeton",
    button2: "Atlantic City",
    correct: "button0"
  }
]

let counter = 0;
let answer = "";
let storage = [];
let numCorrect = 0;
let numTotal = 0;
let x = ''

//answer is the id of the element
function submit(){

  console.log(answer)

  if(answer === ""){
    alert('make a selection')
  }

  //first question of quiz
  else if(counter === 0){
    if(firstAns === answer){
      console.log("correct!");
      right();
    }else{  //wrong answer on first question
      console.log("sorry, wrong answer...")
      wrong();
    }

    //end of quiz
    }else if(answer === data[counter].correct && counter === data.length-1){
      alert("quiz over")
      numCorrect++;
      $('#nextBtn').attr('disabled', true);
      $('#submitBtn').attr('disabled', true);
      $('#againBtn').attr('disabled', false);
      x = answer[answer.length-1]
      $('#border' + x).css('border', '5px solid green');
    }else if(answer !== data[counter].correct && counter === data.length-1){
      alert("quiz over")
      $('#nextBtn').attr('disabled', true);
      $('#submitBtn').attr('disabled', true);
      $('#againBtn').attr('disabled', false);
      x = answer[answer.length-1]
      $('#border' + x).css('border', '5px solid red');
    }
    
    else{  //all other questions besides the first and the last questions
    if(answer === data[counter].correct){
        console.log("correct!")
        right();
      }else{
        console.log("sorry, incorrect...")
        wrong();
      }
  }

  //executes no matter what
  numTotal++;
  counter++;
  $('#correct').html(numCorrect + "/" + numTotal) 
}

//when clicking the radio buttons
function register(value){
  $('#submitBtn').attr('disabled', false);
  answer = value.id;
}

function next(){
  console.log("x is " + x)
    $('#question').html(data[counter].question)
    $('#label0').html(data[counter].button0)
    $('#label1').html(data[counter].button1)
    $('#label2').html(data[counter].button2)
    $('#nextBtn').attr('disabled', true);
    $('#border' + x).css('border','');
    $('input').prop('checked', false);
}

function right(){
  $('#nextBtn').attr('disabled', false);
  $('#submitBtn').attr('disabled', true);
  x = answer[answer.length-1]
  $('#border' + x).css('border', '5px solid green');
  numCorrect++;
}

function wrong(){
  $('#nextBtn').attr('disabled', false);
  $('#submitBtn').attr('disabled', true);
  x = answer[answer.length-1]
  $('#border' + x).css('border', '5px solid red');
}

function playAgain(){
  location.reload()
}