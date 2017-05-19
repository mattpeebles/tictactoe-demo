var gameTemplate = 	"<div class=\"board\">" +
						"<div class=\"row\" id=\"row-1\">" +
							"<div class=\"col-xs-4 first-row first-column forwardDiag box\" id=\"box1-1\"></div>" +
							"<div class=\"col-xs-4 first-row second-column box\" id=\"box1-2\"></div>" +
							"<div class=\"col-xs-4 first-row third-column backwardDiag box\" id=\"box1-3\"></div>" +
						"</div>" +
						"<div class=\"row\" id=\"row-2\">" +
							"<div class=\"col-xs-4 second-row first-column box\" id=\"box2-1\"></div>" +
							"<div class=\"col-xs-4 second-row second-column forwardDiag backwardDiag box\" id=\"box2-2\"></div>" +
							"<div class=\"col-xs-4 second-row third-column box\" id=\"box2-3\"></div>" +
						"</div>" +
						"<div class=\"row\" id=\"row-3\">" +
							"<div class=\"col-xs-4 third-row first-column backwardDiag box\" id=\"box3-1\"></div>" +
							"<div class=\"col-xs-4 third-row second-column box\" id=\"box3-2\"></div>" +
							"<div class=\"col-xs-4 third-row third-column forwardDiag box\" id=\"box3-3\"></div>" +
						"</div>" +
						"<div class=\"button-container\">" +
							"<button class=\"btn btn-default redo hidden\">Play Again?</button>" +
						"</div>" +
					"</div>";


var possibleWinners = {
		"first-row": {
			"box1-1": 0,
			"box1-2": 0,
			"box1-3": 0,
		}, 
		"first-column": {
			"box1-1": 0,
			"box2-1": 0,
			"box3-1": 0,
		},
		"forwardDiag": {
			"box1-1": 0,
			"box2-1": 0,
			"box3-1": 0,
		},
		"second-row": {
			"box2-1": 0,
			"box2-2": 0,
			"box2-3": 0,
		},
		"second-column": {
			"box1-2": 0,
			"box2-2": 0,
			"box3-2": 0,
		},
		"third-row": {
			"box3-1": 0,
			"box3-2": 0,
			"box3-3": 0,
		},
		"third-column": {
			"box1-3": 0,
			"box2-3": 0,
			"box3-3": 0,
		},
		"backwardDiag": {
			"box3-1": 0,
			"box2-2": 0,
			"box1-3": 0,
		},
}



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
		var counter = $(".gamePiece", currentBoard).length;
		var currentBoard = $(this).parent().parent()
		var selectedClasses = ($(this).attr("class").split(" "))

		selectedClasses.forEach(function(item){
				var formItem = "\"" + item + "\""
				console.log(formItem)
				var test =  possibleWinners[formItem]
				console.log(test)
		})

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