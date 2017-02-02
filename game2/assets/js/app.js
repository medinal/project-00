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
    var makeAsteroids = setInterval(createAsteroid, Math.random() * (4000) + 500);
    var asteroidCollisionDetection = setTimeout(asteroidCollision,10);
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
  $('#playerA').css('left', "");
  $('#playerA').css('top', "");
  $('#playerA').css('rotate', "");
  $('#playerB').css('top', "");
  $('#playerB').css('rotate', "");
  $('#playerB').css('left', "");
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
  $('#playerA').css('left', "");
  $('#playerA').css('top', "");
  $('#playerA').css('rotate', "-90");
  $('#playerB').css('top', "");
  $('#playerB').css('rotate', "-90");
  $('#playerB').css('left', "");
  $('.notification').text("");
}

// Player Motion
function move(key){
  // Player A Right - Done
  if (key.which === 186 && (x-$('#playerA').position().left)>0){
    var currentX = $('#playerA').position().left;
    $('#playerA').css('left',currentX+20);
    $('#playerA').css('rotate', -90);
    collision()
  }
    // Player A Left - Done
    else if (key.which === 75 && ($('#playerA').position().left) > 0){
    var currentX = $('#playerA').position().left;
    $('#playerA').css('left',currentX-20);
    $('#playerA').css('rotate', 90);
    collision()
  }
    // Player A Down - Done
    else if (key.which === 76 && (y-$('#playerA').position().top) > 210){
    var currentY = $('#playerA').position().top;
    $('#playerA').css('top', currentY+20);
    $('#playerA').css('rotate', -360);
    collision()
  }
    // Player A Up - Done
    else if (key.which === 79 && $('#playerA').position().top > 0){
    var currentY = $('#playerA').position().top;
    $('#playerA').css('top', currentY-20);
    $('#playerA').css('rotate', 180);
    collision()
  }
    // Player B Right - Done
    else if (key.which === 68 && (x-$('#playerB').position().left)>0){
    var currentX = $('#playerB').position().left;
    $('#playerB').css('left',currentX+20);
    $('#playerB').css('rotate', -90);
    collision()
  }
    // Player B Left - Done
    else if (key.which === 65 && $('#playerB').position().left > 0){
    var currentX = $('#playerB').position().left;
    $('#playerB').css('left',currentX-20);
    $('#playerB').css('rotate', 90);
    collision()
  }
    // Player B Down - Done
    else if (key.which === 83 && (y-$('#playerB').position().top) > 210){
    var currentY = $('#playerB').position().top;
    $('#playerB').css('top', currentY+20);
    $('#playerB').css('rotate', -360);
    collision()
  }
    // Player B Up - Done
    else if (key.which === 87 && $('#playerB').position().top > 0){
    var currentY = $('#playerB').position().top;
    $('#playerB').css('top', currentY-20);
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
var asteroidNum=0;
function createAsteroid(){
  if (asteroidNum === 10){
    asteroidNum=0;
    $(".asteroid").remove();
  } else {
    $("#game-board").append('<img id="asteroid' + asteroidNum + '" class="asteroid img-responsive" data-xval="' + `${x}` +  '" src="assets/imgs/asteroid.png">')
    $('#asteroid' + asteroidNum + '').css('left', x);
    $('#asteroid' + asteroidNum + '').css('top', (Math.random()*y));
    $('#asteroid' + asteroidNum + '').animate({
      left: -x,
    }, Math.random()*10000);
    asteroidNum++;
  };
};

function asteroidCollision(){
  for (i=0; i<asteroidNum; i++){
    if ($('#playerA').position().left < $('#asteroid' + asteroidNum + '').position().left + 200 &&
       $('#playerA').position().left + 200 > $('#asteroid' + asteroidNum + '').position().left &&
       $('#playerA').position().top < $('#asteroid' + asteroidNum + '').position().top + 75 &&
       75 + $('#playerA').position().top > $('#asteroid' + asteroidNum + '').position().top) {
       console.log("collision");
    }
  }
}
