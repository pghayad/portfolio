let words = ['place', 'zebra', 'lions', 'under', 'third', 'theme', 'fries', 'gusto', 'hives', 'ghost',
'reply', 'chair', 'plant', 'fuzzy', 'gypsy', 'guide', 'mania', 'rusty']
let randomIdx = Math.round(Math.random() * words.length)
let word = words[randomIdx].toLowerCase()
let board = $('#board');
let ids = ['a', 'b', 'c', 'd', 'e', 'f']
let alphabet = ['a','b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
               'm']
let alphabetStr = 'abcdefghijklmnopqrstuvwxyz'

$(document).ready(function(){
  //show letter board
  showLetterBoard()
  //move from input to input on keypress
  const inputs = Array.prototype.slice.call(
  document.querySelectorAll('input')
);

inputs.forEach((input) => {
  input.addEventListener('keydown', (event) => {
    const num = Number(event.key);
    if (num && num >= 0 && num <= 9) { // Only allow numbers
      if (input.value.length >= input.maxLength) {
        event.preventDefault();
        focusNext();
      }
    }
  });
});

function focusNext() {
  const currInput = document.activeElement;
  const currInputIndex = inputs.indexOf(currInput);
  const nextinputIndex =
    (currInputIndex + 1) % inputs.length;
  const input = inputs[nextinputIndex];
  input.focus();
}
  // $("input").on("keypress", function(e){
  //   $(this).next().trigger("focus");
  // })
  //a0, a
  for(let i = 0; i < 6; i++){
      board.append(
    "<br>" + 
    '<input id='+ids[i]+"0"+' size="1" maxlength="1" type="text"/><input id='+ids[i]+"1"+'  size="1" maxlength="1" type="text"/><input id='+ids[i]+"2"+' size="1" maxlength="1" type="text"/><input  id='+ids[i]+"3"+' size="1" maxlength="1" type="text"/><input  id='+ids[i]+"4"+' size="1" maxlength="1" type="text"/><button id='+i+' onclick="submit('+i+')">Submit</button>'
  )
  }
});

function submit(i){
  //console.log(i)
  //console.log($('#'+ids[i]+i).val())
  let val;
  let input;
  let count = 0;

  console.log(words[0][i])
  for(let j = 0; j < 5; j++){
    console.log($('#'+ids[i]+j).val())
    val = $('#'+ids[i]+j).val().toLowerCase(); //a
    input = $('#'+ids[i]+j)      //
    
    if(val === word[j]){
      //input.css('box-shadow', '0 0 20px lightgreen')
      input.css('background-color', 'lightgreen')
      $('#' + val).css('background-color', 'lightgreen')
      count++;
    }else if(word.includes(val)){
      //input.css('box-shadow', '0 0 20px yellow')
      input.css('background-color', 'yellow')
      $('#' + val).css('background-color', 'yellow')
    }else{
      $('#' + val).css('background-color', 'gray')
    }

    input.prop('disabled', true)
  }

  //winning condition
  if(count === 5){
    alert("You win! Congrats")
  }
}

function checkLetters(){
  
}

function showLetterBoard(){
  let letterBoard = $('#letterBoard')
  let letterTable = $('#letterTable')
  let tableRow = $('#tableRow')
  // tableRow.css('border', '5px solid black')
  letterTable.css('border', '2px solid black')

  for(let i = 0; i < alphabetStr.length; i++){
    //var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + name + "</td><td>" + subject + "</td></tr>";
    //console.log(alphabetStr[i])
    if(i === 13)
      letterBoard.append("<br>")
   
   letterBoard.append("<span id="+alphabetStr[i] + " style='border: 2px solid black'>" + alphabetStr[i] + '</span>')
  }
}