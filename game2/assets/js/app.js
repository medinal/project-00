// $('#play').click(begin);
//
// $('#clear').click(endGame);


//
$(document).keydown(move);
// //
// // function begin(){
// //   createBoard();
// //   $('#play').attr("disabled", "disabled");
// //   $('.notification').text(3);
// //   setTimeout(countdown,1000);
// // }
// //
// //
// // function countdown(){
// //   var countdownTime = parseInt($('.notification').text());
// //   if (parseInt($('.notification').text()) === 1){
// //     $('.notification').text("GO!");
// //     countdown();
// //   } else if (parseInt($('.notification').text()) >1){
// //     countdownTime--;
// //     console.log($('.notification').text());
// //     $('.notification').text(countdownTime);
// //     setTimeout(countdown,1000);
// //   } else if ($('.notification').text()==="GO!"){
// //     console.log("success");
// //     $(document).keydown(move);
// //   };
// // }
// //
// // function endGame(){
// //   $('#play').removeAttr("disabled");
// //   $('#playerA').attr('class', 'col-xs-1');
// //   $('#playerA').attr('data-loc', '0');
// //   $('#playerB').attr('class', 'col-xs-1');
// //   $('#playerB').attr('data-loc', '0');
// //   $(document).off('keydown', move);
// // }
// //
// // function createBoard(){
// //   $('#playerA').attr('class', 'col-xs-1');
// //   $('#playerB').attr('class', 'col-xs-1');
// // }
//
function move(key){
  if (key.which === 186 && $('#playerA').position().right != 0){
    var currentX = $('#playerA').position().left;
    $('#playerA').css('left',currentX+15);
    $('#playerA').css('rotate', -90);
  } else if (key.which === 75 && $('#playerA').position().left != 0){
    var currentX = $('#playerA').position().left;
    $('#playerA').css('left',currentX-15);
    $('#playerA').css('rotate', 90);
  } else if (key.which === 76 && $('#playerA').position().bottom != 0){
    var currentY = $('#playerA').position().top;
    $('#playerA').css('top', currentY+15);
    $('#playerA').css('rotate', -360);
  } else if (key.which === 79 && $('#playerA').position().top != 0){
    var currentY = $('#playerA').position().top;
    $('#playerA').css('top', currentY-15);
    $('#playerA').css('rotate', 180);
  } else if (key.which === 68 && $('#playerB').position().right != 0){
    var currentX = $('#playerB').position().left;
    $('#playerB').css('left',currentX+15);
    $('#playerB').css('rotate', -90);
  } else if (key.which === 65 && $('#playerB').position().left != 0){
    var currentX = $('#playerB').position().left;
    $('#playerB').css('left',currentX-15);
    $('#playerB').css('rotate', 90);
  } else if (key.which === 83 && $('#playerB').position().bottom != 0){
    var currentY = $('#playerB').position().top;
    $('#playerB').css('top', currentY+15);
    $('#playerB').css('rotate', -360);
  } else if (key.which === 87 && $('#playerB').position().top != 0){
    var currentY = $('#playerB').position().top;
    $('#playerB').css('top', currentY-15);
    $('#playerB').css('rotate', 180);
  }
}
//
// // function checkWin(){
// //   if(parseInt($('#playerA').attr('data-loc'))===11){
// //     $('.notification').text("Player 1 Wins!")
// //     $(document).off('keydown', move);
// //   } else if(parseInt($('#playerB').attr('data-loc'))===11){
// //     $('.notification').text("Player 2 Wins!")
// //     $(document).off('keydown', move);
// //   }
// // }
