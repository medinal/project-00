$('#play').click(begin);

$('#clear').click(endGame);

function begin(){
  createBoard();
  $('#play').attr("disabled", "disabled");
  $('.notification').text(3);
  setTimeout(countdown,1000);
}


function countdown(){
  var countdownTime = parseInt($('.notification').text());
  if (parseInt($('.notification').text()) === 1){
    $('.notification').text("GO!");
    countdown();
  } else if (parseInt($('.notification').text()) >1){
    countdownTime--;
    console.log($('.notification').text());
    $('.notification').text(countdownTime);
    setTimeout(countdown,1000);
  } else if ($('.notification').text()==="GO!"){
    console.log("success");
    $(document).keydown(move);
  };
}

function endGame(){
  $('#play').removeAttr("disabled");
  $('#playerA').attr('class', 'col-xs-1');
  $('#playerA').attr('data-loc', '0');
  $('#playerB').attr('class', 'col-xs-1');
  $('#playerB').attr('data-loc', '0');
  $(document).off('keydown', move);
}

function createBoard(){
  $('#playerA').attr('class', 'col-xs-1');
  $('#playerB').attr('class', 'col-xs-1');
}

function move(key){
  if (key.which === 191 && parseInt($('#playerA').attr('data-loc'))<11){
    var distance = parseInt($('#playerA').attr('data-loc'));
    distance++;
    $('#playerA').attr('data-loc', distance);
    $('#playerA').attr('class', 'col-xs-1 col-xs-offset-' + `${distance}`);
    checkWin();
  } else if (key.which === 90 && parseInt($('#playerB').attr('data-loc'))<11){
    var distance = parseInt($('#playerB').attr('data-loc'));
    distance++;
    $('#playerB').attr('data-loc', distance);
    $('#playerB').attr('class', 'col-xs-1 col-xs-offset-' + `${distance}`);
    checkWin();
  }
}

function checkWin(){
  if(parseInt($('#playerA').attr('data-loc'))===11){
    $('.notification').text("Player 1 Wins!")
    $(document).off('keydown', move);
  } else if(parseInt($('#playerB').attr('data-loc'))===11){
    $('.notification').text("Player 2 Wins!")
    $(document).off('keydown', move);
  }
}
