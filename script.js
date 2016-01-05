console.log('XO');

//9 x independent JQ square objects
var $squareTL= $('.square.top.left');
var $squareTM= $('.square.top');
var $squareTR= $('.square.top.right');

var $squareML= $('.square.left');
var $squareMM= $('.square');
var $squareMR= $('.square.right');

var $squareBL= $('.square.bottom.left');
var $squareBM= $('.square.bottom');
var $squareBR= $('.square.bottom.right');

//JQ board object
var $board= $('.board');

//JQ board object
var $playerDisp= $('playerDisp');

var player = 1;

var showWhosTurn = function(){
	if (player === 1){
		$(playerDisp).html("Player 1's turn");
	}
	else if (player === 2){
		$(playerDisp).html("Player 2's turn");
	}
}
showWhosTurn();



//just select one specific square by using a second paramater for the function
//board is parent, .square is child. can also do "event target' instead of 'this'
$board.on('click', '.square',function(){
		console.log('square clicked');
		if (player == 1){
			$(this).html('X');
			player++;
			showWhosTurn();
		}
		else if(player == 2){
			$(this).html('O');
			player--;
			showWhosTurn();
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