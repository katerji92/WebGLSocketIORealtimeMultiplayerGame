module.exports = function(app){
	var bodyParser = require('body-parser');
	var jsonParser = bodyParser.json();
	var urlencodedParser = bodyParser.urlencoded({extended:true});

	var io = require('socket.io')(http);
	io.on('connect', function(socket){
		console.log('a player has connected');
		socket.on('disconnect', function(){
			console.log('a player has disconnected');
		});
	});

	var gameState = {
		paused : true,
		ballPosition : {
			x:0,
			y:0
		},
		player1Y:0,
		player2Y:0,
		player1Score:0,
		player2Score:0
	}

	app.get('/gamestate', function(req, res){
		res.send(gameState);
	});

	app.post('/gamestate', function(req, res){
		//ToDo: Change this to only send the Y coordinate
		gameState = req.body;

		io.omit('gameStateChange', req.body);

		return res.sendStatus(200);
	});


}