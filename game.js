//Establish the available colors
var buttonColors = ["red", "blue", "green", "yellow"];

//Array to contain the randomly generated Simon sequence
var gamePattern = [];

//User clicked pattern
var userClickedPattern = [];

//level
var level = 0;

//Keep track of the number of entries for each level
var entryNumber = 0;

//Click handler Function
  $(".btn").on("click", function(event) {
    var userChosenColor = this.id
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer();
  });

  //Start the game
    $(document).on("keypress", function() {
      if (level === 0) {
      nextSequence();
    }
  })

//Function to add a color to the Simon sequence
function nextSequence() {
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress (randomChosenColor);
}

//Function to check the answer
function checkAnswer() {
      //Is the answer correct?
      if (gamePattern[entryNumber] === userClickedPattern[entryNumber]) {
      entryNumber++;
        //Is this the last entry for the sequence?
        if (entryNumber === level) {
          entryNumber = 0;
          userClickedPattern = [];
          setTimeout(function(){
            nextSequence();
          }, 1000);
        }
    //Wrong answer
    } else {
      playSound("wrong");
      $("body").toggleClass("game-over");
      setTimeout(function(){
        $("body").toggleClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      gameOver();
    }
  }

//Function to play sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Function to animate the press
function animatePress(currentColor) {
    $("#" + currentColor).toggleClass('pressed');
    setTimeout(function(){
    $("#" + currentColor).toggleClass('pressed');
    }, 100 );
}

//Function to reset the game
function gameOver() {
  level = 0;
  entryNumber = 0;
  userClickedPattern = [];
  gamePattern = [];
}
