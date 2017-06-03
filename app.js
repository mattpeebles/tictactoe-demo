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


var possibleWinners = [
		{
		"truple": "first-row",
			"box1-1": 0,
			"box1-2": 0,
			"box1-3": 0,
		}, 
		{
		"truple": "first-column",
			"box1-1": 0,
			"box2-1": 0,
			"box3-1": 0,
		},
		{
		"truple": "forwardDiag",
			"box1-1": 0,
			"box2-2": 0,
			"box3-3": 0,
		},
		{
		"truple": "second-row",
			"box2-1": 0,
			"box2-2": 0,
			"box2-3": 0,
		},
		{
		"truple": "second-column",
			"box1-2": 0,
			"box2-2": 0,
			"box3-2": 0,
		},
		{
		"truple": "third-row",
			"box3-1": 0,
			"box3-2": 0,
			"box3-3": 0,
		},
		{
		"truple": "third-column",
			"box1-3": 0,
			"box2-3": 0,
			"box3-3": 0,
		},
		{
		"truple": "backwardDiag",
			"box3-1": 0,
			"box2-2": 0,
			"box1-3": 0,
		},
]

let winnerCheck = 0

let winnerStatus = false;


function playAgain(){
	$("#game-container").on("click", ".redo", function(){
		var currentBoard = $(this).parent().prev()
		console.log($(currentBoard).attr('id'))
		$(".box", currentBoard).empty();
		$(this).addClass("hidden")
		document.getElementById(currentBoard.attr("id")).style.pointerEvents = 'auto'
		$("#winner-message").remove()
		winnerCheck = 0
		winnerStatus = false
	})
}

function winner(element){
	document.getElementById(element.attr("id")).style.pointerEvents = 'none'
	$(".redo", element.next()).removeClass("hidden");
	possibleWinners = 	[
							{
							"truple": "first-row",
								"box1-1": 0,
								"box1-2": 0,
								"box1-3": 0,
							}, 
							{
							"truple": "first-column",
								"box1-1": 0,
								"box2-1": 0,
								"box3-1": 0,
							},
							{
							"truple": "forwardDiag",
								"box1-1": 0,
								"box2-2": 0,
								"box3-3": 0,
							},
							{
							"truple": "second-row",
								"box2-1": 0,
								"box2-2": 0,
								"box2-3": 0,
							},
							{
							"truple": "second-column",
								"box1-2": 0,
								"box2-2": 0,
								"box3-2": 0,
							},
							{
							"truple": "third-row",
								"box3-1": 0,
								"box3-2": 0,
								"box3-3": 0,
							},
							{
							"truple": "third-column",
								"box1-3": 0,
								"box2-3": 0,
								"box3-3": 0,
							},
							{
							"truple": "backwardDiag",
								"box3-1": 0,
								"box2-2": 0,
								"box1-3": 0,
							},
						]
}


function gamePlay(){
	$("#game-container").on("click", ".box", function(){
		var counter = $(".gamePiece", currentBoard).length;
		var currentBoard = $(this).parent().parent()

		if ($(this).children().length > 0){
			$(this).empty();
			return;
		}

		else if(counter % 2 != 0){
			var gamePiece = "resources/x.png"
			let boxId = `${this.id}`
			possibleWinners.forEach(function(item){
				if (boxId in item){
					item[boxId] = 2;
					for (var i in item){
						if (item[i] === 2){
							winnerCheck++
						}
						else{
							winnerCheck = 0
						}
						if ((winnerCheck === 3) && (winnerStatus == false)){
							$(currentBoard).append("<div id=\"winner-message\">X Won</div>")
							winnerStatus = true;
							winner(currentBoard)
						}
					}
				}
			})
		}

		else{
			var gamePiece = "resources/o.png"
			let boxId = `${this.id}`
			possibleWinners.forEach(function(item){
				if (boxId in item){
					item[boxId] = 1;
					for (var i in item){
						if (item[i] === 1){
							winnerCheck++
						}
						else{
							winnerCheck = 0
						}
						if (winnerCheck === 3 && winnerStatus == false){
							$(currentBoard).append("<div id=\"winner-message\">O Won</div>")
							winnerStatus = true;
							winner(currentBoard)
						}
					}
				}
			})
		}

		var resultHTML = "<div class=\"gamePiece-container\">" + 
							"<img class=\"gamePiece\" src=\"" + gamePiece + "\">" + 
						 "</div>"

		$(this).html(resultHTML)

		if (counter == 8 && winnerCheck == false){
			$(".redo", currentBoard.next()).removeClass("hidden");
			document.getElementById(currentBoard.attr("id")).style.pointerEvents = 'none'
			$(currentBoard).append("<div id=\"winner-message\">Tie</div>")
			winnerCheck = 0
			possibleWinners = [
									{
									"truple": "first-row",
										"box1-1": 0,
										"box1-2": 0,
										"box1-3": 0,
									}, 
									{
									"truple": "first-column",
										"box1-1": 0,
										"box2-1": 0,
										"box3-1": 0,
									},
									{
									"truple": "forwardDiag",
										"box1-1": 0,
										"box2-2": 0,
										"box3-3": 0,
									},
									{
									"truple": "second-row",
										"box2-1": 0,
										"box2-2": 0,
										"box2-3": 0,
									},
									{
									"truple": "second-column",
										"box1-2": 0,
										"box2-2": 0,
										"box3-2": 0,
									},
									{
									"truple": "third-row",
										"box3-1": 0,
										"box3-2": 0,
										"box3-3": 0,
									},
									{
									"truple": "third-column",
										"box1-3": 0,
										"box2-3": 0,
										"box3-3": 0,
									},
									{
									"truple": "backwardDiag",
										"box3-1": 0,
										"box2-2": 0,
										"box1-3": 0,
									},
							]
		}
	});
}

$(function(){
	gamePlay();
	playAgain();
})