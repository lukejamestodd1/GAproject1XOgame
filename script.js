console.log('XO');

//JS array
var boardArray = [0.0, 0.1, 0.2,
						      0.3, 0.4, 0.5,
						      0.6, 0.7, 0.8];

// //9 x independent JQ square objects - don't need
// var $square0= $('.square.top.left');
// var $square1= $('.square.top');
// var $square2= $('.square.top.right');
// var $square3= $('.square.left');
// var $square4= $('.square.mid');
// var $square5= $('.square.right');
// var $square6= $('.square.bottom.left');
// var $square7= $('.square.bottom');
// var $square8= $('.square.bottom.right');

//JQ board object
var $board= $('.board');

//JQ heading to show player
var $playerDisp= $('playerDisp');

//player 1 or player 2
var player = 1;

var turns = 0;

//function to show who's turn it is
var showWhosTurn = function(){
	if (player === 1){
		$(playerDisp).html("Player 1's turn");
	}
	else if (player === 2){
		$(playerDisp).html("Player 2's turn");
	}
}

//initial call when game starts
showWhosTurn();

//function to check whether game is over
//pass current player in
var isGameOver = function(){
	
	//if a row of three found
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
		$(playerDisp).html('Player  ' + player + ' is the winner!')
	}

	//if no winner but board full
	 else if (turns === 9){
		console.log("It's a draw!");
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
		return true;
	}
}

//just select one specific square by using a second paramater for the function
//board is parent, .square is child. can also do "event target' instead of 'this'
$board.on('click', '.square',function(){

		//increment no of turns
		turns++;

		//check the square isn't already taken
		if (checkSquare($(this)) === false){

				console.log('false');

				if (player === 1){

				//change the square to player's symbol
				$(this).html('X');

				//get ID number of square clicked
				var i = $(this).attr('id');
				var j = (i.length)-1;
				var index = i.charAt(j);

				//update boardArray index to playerno
				boardArray[index] = player;

				//check for game over - pass in player no
				if (isGameOver() == false){
					//change to other player's turn and show
				player++;
				showWhosTurn();
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


				
			}	
		}
		else{
			console.log('spot taken!');
		}
			
});



// event listener/handler for clicking on squares. 1 before click means "1 click"
// so function isn't called again for more clicks
//set square to display html character
//must convert jq object to html for this
// $squareTL.on('click', function(){
// 		console.log('square clicked');
// 		$squareTL.html('X');
// });