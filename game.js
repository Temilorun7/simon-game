alert("welcome to the simon game. Enjoy!");

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


//when a user presses any key to start the game
$(document).keydown(function(){
	if(!started) {
		$("#level-title").text("Level  " + level);
		nextSequence();
		started = true;

	}
});



//selecting the button that was clicked and playing its sound

$(".btn").click(function() {
	var userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);

	playsound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length-1)
});




function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
		console.log("Success");

		// else 
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 500);
		}
	} else {
		console.log("wrong");

		playSound("wrong");

		$('body').addClass('game-over');
		$('#level-title').text("Game Over, Press Any Key to Restart");

		setTimeout(function() {
			$('body').removeClass('game-over');
		}, 200);

		
		startOver();
		}
}



//creating a random = number to use to select button colours
function nextSequence() {
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level  " + level);
	var randomNumber = Math.floor(Math.random() * 4);

	var randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColor);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);

	playsound(randomChosenColour);
	
}


function animatePress(currentColour) {
	$('#' + currentColour).addClass("pressed");
		setTimeout(function () {
			$('#' + currentColour).removeClass("pressed");
		}, 100);
		 
	};


//this function will be used when a user clicks a button
function playsound(name){
	var audio = new Audio('sounds/' + name + '.mp3');
	audio.play();

}



function startOver() {
	level = 0;
	gamePattern = [];
	started = false;
}