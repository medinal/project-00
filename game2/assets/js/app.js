$('#play').click(begin);

$('#clear').click(reset);

var y = $('#game-board').height();
var x = $('#game-board').width()-85;

function begin(){
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
    $('.notification').text(countdownTime);
    setTimeout(countdown,1000);
  } else if ($('.notification').text()==="GO!"){
    $(document).keydown(move);
    timing();
  };
}

function endGame(){
  timing();
  $(document).off('keydown', move);
  var previous = $("#total-time").text();
  $("#previous").text("Previous: " + previous);
}

function reset(){
  $(document).off('keydown', move);
  $('#play').removeAttr("disabled");
  $("#total-time").text("");
  total = 0;
  startTime=0;
  endTime=0;
  repeatDisplay=0;
  $('#playerA').css('left', "");
  $('#playerA').css('rotate', "");
  $('#playerB').css('left', "");
  $('#playerB').css('rotate', "");
}

function move(key){
  // Player A Right - Done
  if (key.which === 186 && (x-$('#playerA').position().left)>0){
    var currentX = $('#playerA').position().left;
    $('#playerA').css('left',currentX+10);
    $('#playerA').css('rotate', -90);
    collision()
  }
    // Player A Left - Done
    else if (key.which === 75 && (x-$('#playerA').position().left) > 0){
    var currentX = $('#playerA').position().left;
    $('#playerA').css('left',currentX-10);
    $('#playerA').css('rotate', 90);
    collision()
  }
    // Player A Down - Done
    else if (key.which === 76 && (y-$('#playerA').position().top) > 210){
    var currentY = $('#playerA').position().top;
    $('#playerA').css('top', currentY+10);
    $('#playerA').css('rotate', -360);
    collision()
  }
    // Player A Up - Done
    else if (key.which === 79 && $('#playerA').position().top > 0){
    var currentY = $('#playerA').position().top;
    $('#playerA').css('top', currentY-10);
    $('#playerA').css('rotate', 180);
    collision()
  }
    // Player B Right - Done
    else if (key.which === 68 && (x-$('#playerB').position().left)>0){
    var currentX = $('#playerB').position().left;
    $('#playerB').css('left',currentX+10);
    $('#playerB').css('rotate', -90);
    collision()
  }
    // Player B Left - Done
    else if (key.which === 65 && $('#playerB').position().left > 0){
    var currentX = $('#playerB').position().left;
    $('#playerB').css('left',currentX-10);
    $('#playerB').css('rotate', 90);
    collision()
  }
    // Player B Down - Done
    else if (key.which === 83 && (y-$('#playerB').position().top) > 210){
    var currentY = $('#playerB').position().top;
    $('#playerB').css('top', currentY+10);
    $('#playerB').css('rotate', -360);
    collision()
  }
    // Player B Up - Done
    else if (key.which === 87 && $('#playerB').position().top > 0){
    var currentY = $('#playerB').position().top;
    $('#playerB').css('top', currentY-10);
    $('#playerB').css('rotate', 180);
    collision()
  }
}

function collision(){
  if ($('#playerA').position().left < $('#playerB').position().left + 50 &&
     $('#playerA').position().left + 50 > $('#playerB').position().left &&
     $('#playerA').position().top < $('#playerB').position().top + 50 &&
     50 + $('#playerA').position().top > $('#playerB').position().top) {
     endGame();
  }
}

var startTime; // undefined

// track the most recent "end" time
var endTime; // undefined

// a boolean to keep track of whether the timer is on or off
var counting = false;

// variable used for continuous time update while counting
var repeatDisplay;

// stores total time counted so far
var total = 0;

function timing(){
    if (!counting){
      counting = true;
      startTime = Date.now();
      repeatDisplay = setInterval(showCurrentTotal, 100);
    } else {
      counting = false;
      clearInterval(repeatDisplay);
      endTime = (Date.now() - startTime)/1000;
      total = total + endTime;
      $("#total-time").text( total + " seconds" );
  }
}

function showCurrentTotal(){
  var elapsedTime = (Date.now() - startTime)/1000;
  $("#total-time").text( (total + elapsedTime) + " seconds" );
}
