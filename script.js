console.log('XO');

	//JQ board object
	var $board = $('.board');
	var $square = $('.square');

	//JQ heading to show which player is up
	var $playerDisp = $('playerDisp');

	var timing = 1500;

//wrap 2-player game into a function
var xoGame = function(){

	//result of the game - player 1, 2, or draw (0)
	//JS array for game board
	//player 1 or player 2
	//number of turns - game ends after 9
	//scores kept in array. (pos0: draws, pos1: player1, pos2: player2)
	var result;
	var boardArray = [];
	var player;
	var turns = 0;
	scoresArray = [0, 0, 0];

	var updateScores = function(){
		$('#player1Score').html(scoresArray[1]);
		$('#player2Score').html(scoresArray[2]);
		$('#drawScore').html(scoresArray[0]);
	}

	//function to show who's turn it is
	var showWhosTurn = function(){
		if (player === 1){
			$(playerDisp).html("Player 1's turn");
		}
		else if (player === 2){
			$(playerDisp).html("Player 2's turn");
		}
	}

	//reset function for new game
	var newGame = function(){
		boardArray = [0.0, 0.1, 0.2,
								  0.3, 0.4, 0.5,
								  0.6, 0.7, 0.8];
		player = 1;
		turns = 0;
		showWhosTurn();
		result = -1;
		$('.square').css('color', 'white');
		$('.square').html('');
		updateScores();
	}

	var $animateBoard = function(playerNo){
		if (result === 0){
			$('.square').html('!!');
		}
		else{
		//9 x independent JQ square objects stored in array
		var $squareNo= [
		$('.square.top.left'),
		$('.square.top'), 
		$('.square.top.right'),
		$('.square.left'),
		$('.square.mid'),
		$('.square.right'),
		$('.square.bottom.left'),
		$('.square.bottom'),
		$('.square.bottom.right')];

		//loop through game board and change
		for (var i = 0; i < boardArray.length; i++){
			if (boardArray[i] === playerNo){
				//change text colour
				$squareNo[i].css('color', 'red');
			}
			else{
				$squareNo[i].html('!');
				$squareNo[i].css('color', 'grey');
			}
		}
	}
	}
	
	setTimeout(newGame, timing);

	//function to check whether game is over
	var isGameOver = function(){
		//if a row of three is found
		if (
			((boardArray[0] === boardArray[1]) && (boardArray[0] === boardArray[2])) ||
			((boardArray[0] === boardArray[3]) && (boardArray[0] === boardArray[6])) ||
			((boardArray[0] === boardArray[4]) && (boardArray[0] === boardArray[8])) ||
			((boardArray[1] === boardArray[4]) && (boardArray[1] === boardArray[7])) ||
			((boardArray[2] === boardArray[4]) && (boardArray[2] === boardArray[6])) ||
			((boardArray[2] === boardArray[5]) && (boardArray[2] === boardArray[8])) ||
			((boardArray[6] === boardArray[7]) && (boardArray[6] === boardArray[8])) ||
			((boardArray[3] === boardArray[4]) && (boardArray[3] === boardArray[5]))
			){

			console.log('Player ' + player + ' is the winner!');
			$(playerDisp).html('Player  ' + player + ' is the winner!');
			result = player;
			console.log(result);
			$animateBoard(player);
			scoresArray[player]++;
			setTimeout(newGame, timing);
		}
		//if no winner but board full
		else if (turns === 9){
			$(playerDisp).html('Draw!');
			result = 0;
			$animateBoard(player);
			scoresArray[0]++;
			setTimeout(newGame, timing);
		}
		else{
			return false;
		}
	}

	//function to check whether box is already clicked
	var checkSquare = function(selectedSquare){
		if (selectedSquare.html() === ''){
			return false;
		}
		else{
			$(playerDisp).html('That spot is taken! Try again player ' + player);
			return true;
		}
	}

	//just select one specific square by using a second paramater for the function
	//board is parent, .square is child. can also do "event target' instead of 'this'
	$board.on('click', '.square',function(){

			//check the square isn't already taken
			if (checkSquare($(this)) === false){

				//increment no of turns
				turns++;

					if (player === 1){
						//change the square to player's symbol
						$(this).html('X');

						//get ID number of square clicked
						var i = $(this).attr('id');
						var j = (i.length)-1;
						var index = i.charAt(j);

						//update boardArray index to playerno
						boardArray[index] = player;

						//check for game over
						if (isGameOver() == false){
							//change to other player's turn and show
							player++;
							showWhosTurn();
						}
						else{
							console.log(result);
						}
					}
					else if(player === 2){
						//change the board html
						$(this).html('O');

						//get ID number of square clicked
						var i = $(this).attr('id');
						var j = (i.length)-1;
						var index = i.charAt(j);

						//update boardArray index to playerno
						boardArray[index] = player;

						//check for game over
						if (isGameOver() == false){
							//change to other player and show
							player--;
							showWhosTurn();
						}
						else{
							console.log(result);
						}			
					}	
				}
		});
};

xoGame();



// event listener/handler for clicking on squares. 1 before click means "1 click"
// so function isn't called again for more clicks
//set square to display html character
//must convert jq object to html for this
// $squareTL.on('click', function(){
// 		console.log('square clicked');
// 		$squareTL.html('X');
// });

// NORMAL ARRAY
// 0  1  2
// 3  4  5
// 6  7  8

// 			SQUARED SUMS			POSITIONS
// 			        56				6+4+2 = 56 
// 0	 1	4	  --5  				0+1+2 = 5
// 9	16	25	--50				3+4+5 = 50
// 36	49	64	--149				6+7+8 = 149
// |	|		|			80				0+3+6 = 45
// 45	66	93	  					1+4+7 = 66
//												0+4+8 = 80









