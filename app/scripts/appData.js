angular.module('SocketIOPong.data', ['ngResource'])
.factory('GameState', ['$resource', function($resource){
	var server = $resource("http://localhost:3000/gamestate");
	return {
		save : function(newChat){
			server.save(newChat);
		},

		query : function(){
			return server.query();
		}
	};
}]);