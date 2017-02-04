$('#play').click(begin);

$('#clear').click(reset);

var y = $('#game-board').height();
var x = $('#game-board').width()-85;


function begin(){
  $('#play').attr("disabled", "disabled");
  $('#clear').removeAttr("disabled");
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
    var makeAsteroids = setInterval(createAsteroid, Math.random() * (3000)+500);
    var asteroidCollisionDetection = setInterval(asteroidCollision,20);
  };
}

function endGame(){
  timing();
  clearTimeout(7);
  clearTimeout(8);
  $(document).off('keydown', move);
  var previous = $("#total-time").text();
  $("#previous").text("Previous: " + previous);
  $('#clear').attr("disabled","disabled");
  $('#play').removeAttr("disabled");
  $("#total-time").text("");
  total = 0;
  startTime=0;
  endTime=0;
  repeatDisplay=0;
  $('#playerA').css('left', "0");
  $('#playerA').css('top', "300");
  $('#playerA').css('rotate', "-90");
  $('#playerB').css('top', "400");
  $('#playerB').css('rotate', "-90");
  $('#playerB').css('left', "0");
  $('.notification').text("");
}

function reset(){
  timing();
  clearTimeout(7);
  clearTimeout(8);
  $('#clear').attr("disabled","disabled");
  $('#play').removeAttr("disabled");
  $(document).off('keydown', move);
  $("#total-time").text("");
  total = 0;
  startTime=0;
  endTime=0;
  repeatDisplay=0;
  $('#playerA').css('left', "0");
  $('#playerA').css('top', "300");
  $('#playerA').css('rotate', "-90");
  $('#playerB').css('top', "400");
  $('#playerB').css('rotate', "-90");
  $('#playerB').css('left', "0");
  $('.notification').text("");
}

// Player Motion
function move(key){
  // Player A Right - Done
  if (key.which === 186 && (x-$('#playerA').position().left)>0){
    var currentX = $('#playerA').position().left;
    $('#playerA').animate({left: "+=30"}, "fast");
    $('#playerA').css('rotate', -90);
    collision()
  }
    // Player A Left - Done
    else if (key.which === 75 && ($('#playerA').position().left) > 0){
    var currentX = $('#playerA').position().left;
    $('#playerA').animate({left: "-=30"}, "fast");
    $('#playerA').css('rotate', 90);
    collision()
  }
    // Player A Down - Done
    else if (key.which === 76 && (y-$('#playerA').position().top) > 210){
    var currentY = $('#playerA').position().top;
    $('#playerA').animate({top: "+=30"}, "fast");
    $('#playerA').css('rotate', -360);
    collision()
  }
    // Player A Up - Done
    else if (key.which === 79 && $('#playerA').position().top > 0){
    var currentY = $('#playerA').position().top;
    $('#playerA').animate({top: "-=30"}, "fast");
    $('#playerA').css('rotate', 180);
    collision()
  }
    // Player B Right - Done
    else if (key.which === 68 && (x-$('#playerB').position().left)>0){
    var currentX = $('#playerB').position().left;
    $('#playerB').animate({left: "+=30"}, "fast");
    $('#playerB').css('rotate', -90);
    collision()
  }
    // Player B Left - Done
    else if (key.which === 65 && $('#playerB').position().left > 0){
    var currentX = $('#playerB').position().left;
    $('#playerB').animate({left: "-=30"}, "fast");
    $('#playerB').css('rotate', 90);
    collision()
  }
    // Player B Down - Done
    else if (key.which === 83 && (y-$('#playerB').position().top) > 210){
    var currentY = $('#playerB').position().top;
    $('#playerB').animate({top: "+=30"}, "fast");
    $('#playerB').css('rotate', -360);
    collision()
  }
    // Player B Up - Done
    else if (key.which === 87 && $('#playerB').position().top > 0){
    var currentY = $('#playerB').position().top;
    $('#playerB').animate({top: "-=30"}, "fast");
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

// Timer Stuff
var startTime;
var endTime;
var counting = false;
var repeatDisplay;
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

// Asteroid Stuff
var asteroidNum = 0;
function createAsteroid(){
  if (asteroidNum === 10){
    asteroidNum=0;
    $(".asteroid").remove();
  } else {
    $("#game-board").append(`<img id="asteroid${asteroidNum}" class="asteroid img-responsive" src="assets/imgs/asteroid.png">`);
    $(`#asteroid${asteroidNum}`).css('left', x);
    $(`#asteroid${asteroidNum}`).css('top', (Math.random()*y)-75);
    $(`#asteroid${asteroidNum}`).animate({'left': -x}, Math.random()*10000);
    asteroidNum++;
  };
};

function asteroidCollision(){
  if (asteroidNum != 0){
    for (i=0; i<15; i++){
      if ($(`#asteroid${i}`).position().left < $('#playerA').position().left + 60 &&
         $(`#asteroid${i}`).position().left + 75 > $('#playerA').position().left &&
         $(`#asteroid${i}`).position().top < $('#playerA').position().top + 60 &&
         60 + $(`#asteroid${i}`).position().top > $('#playerA').position().top) {
           endGame();
           $("#total-time").text("Player 1 got hit!");
         } else if ($(`#asteroid${i}`).position().left < $('#playerB').position().left + 60 &&
         $(`#asteroid${i}`).position().left + 75 > $('#playerB').position().left &&
         $(`#asteroid${i}`).position().top < $('#playerB').position().top + 60 &&
         60 + $(`#asteroid${i}`).position().top > $('#playerB').position().top) {
           $("#total-time").text("Player 2 got hit!");
           endGame();
        }
      }
    }
  }
