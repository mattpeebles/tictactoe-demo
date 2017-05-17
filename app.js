var gameTemplate = 	"<div class=\"board\">" +
						"<div class=\"row\" id=\"row-1\">" +
							"<div class=\"col-xs-4 first-row first-column box\" id=\"box1-1\"></div>" +
							"<div class=\"col-xs-4 first-row second-column box\" id=\"box1-2\"></div>" +
							"<div class=\"col-xs-4 first-row third-column box\" id=\"box1-3\"></div>" +
						"</div>" +
						"<div class=\"row\" id=\"row-2\">" +
							"<div class=\"col-xs-4 second-row first-column box\" id=\"box2-1\"></div>" +
							"<div class=\"col-xs-4 second-row second-column box\" id=\"box2-2\"></div>" +
							"<div class=\"col-xs-4 second-row third-column box\" id=\"box2-3\"></div>" +
						"</div>" +
						"<div class=\"row\" id=\"row-3\">" +
							"<div class=\"col-xs-4 third-row first-column box\" id=\"box3-1\"></div>" +
							"<div class=\"col-xs-4 third-row second-column box\" id=\"box3-2\"></div>" +
							"<div class=\"col-xs-4 third-row third-column box\" id=\"box3-3\"></div>" +
						"</div>" +
						"<div class=\"button-container\">" +
							"<button class=\"btn btn-default redo hidden\">Play Again?</button>" +
						"</div>" +
					"</div>";


function newBoard(){
	$(".new-board").on("click", function(){
		$("#game-container").append(gameTemplate)
	})
}


function playAgain(){
	$("#game-container").on("click", ".redo", function(){
		var currentBoard = $(this).parent().parent()
		$(".box", currentBoard).empty();
		$(".redo", currentBoard).addClass("hidden")
	})
}


function gamePlay(){
	$("#game-container").on("click", ".box", function(){
		var currentBoard = $(this).parent().parent()
		var counter = $(".gamePiece", currentBoard).length;
		
		if ($(this).children().length > 0){
			$(this).empty();
			return;
		}

		else if(counter % 2 != 0){
			var gamePiece = "resources/x.png"
		}

		else{
			var gamePiece = "resources/o.png"
		}
		var resultHTML = "<div class=\"gamePiece-container\">" + 
							"<img class=\"gamePiece\" src=\"" + gamePiece + "\">" + 
						 "</div>"

		$(this).html(resultHTML)

		if (counter == 8){
			$(".redo", currentBoard).removeClass("hidden");
		}
	});
}

$(function(){
	gamePlay();
	playAgain();
	newBoard();
})