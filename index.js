var gamepattern=[];
var userClickedPattern=[];
var buttonColours=['red','blue','green','yellow'];
var level = 0;
var started=false;

function nextSequence()
{
      userClickedPattern = [];
      level++;
      $("#level-title").text("Level " + level)
      var randomnumber=Math.floor(Math.random()*4);
      var randomChosenColour=buttonColours[randomnumber];
      gamepattern.push(randomChosenColour);
      
      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
      playsound(randomChosenColour);
}
$(".btn").on("click",function()
{
      var userChosenColour=$(this).attr("id");
      userClickedPattern.push(userChosenColour);
      playsound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length-1);


});
function playsound(name)
{
      var audio = new Audio("./sounds/" + name + ".mp3")
      audio.play()
}
function animatePress(currentColour)
{
      $("."+currentColour).addClass("pressed");
      setTimeout(function(){
            $("." + currentColour).removeClass("pressed")

      },50);

}
$(document).keydown(function(){
      
      if(!started)
      {
            
            $("#level-title").text("Level " + level);
            nextSequence();
            started=true;

      }
      
});

function checkAnswer(currentLevel)
{
      if(gamepattern[currentLevel] === userClickedPattern[currentLevel])
      {
            if(userClickedPattern.length === gamepattern.length)
            {
                  setTimeout(function()
                  {
                        nextSequence();

                  },1000);
            }
      }
      else
      {
            playsound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function () {
            $("body").removeClass("game-over")
            }, 200);
            startOver();

      }

}
function startOver()
{
      level=0;
      gamepattern=[];
      started=false;

}

// Sound on Footer
document.querySelector(".footer").addEventListener("click", function () {
  var audio = new Audio("./sounds/Footer.wav")
  audio.play()
});

