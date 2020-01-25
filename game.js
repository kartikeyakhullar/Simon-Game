
var level = 0;
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red","blue","green","yellow"];

$(document).on("keypress",function(){
    if(level==0){
        nextSequence();
    }
})

$(".btn").click(function(event){
    var userChosenColour = $(this).attr("id");
    animatePress(userChosenColour);
    playSound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence(){
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var colorChosen = buttonColours[randomNumber];
    gamePattern.push(colorChosen);
    var key = "#" + colorChosen;
    $(key).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorChosen);
}

function animatePress(currentColour){
    var col = "#" + currentColour;
    $(col).addClass("pressed");
    setTimeout(function(){
        $(col).removeClass("pressed");
    },100);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}








