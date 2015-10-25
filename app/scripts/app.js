angular.module('SocketIOPong', ['ngRoute', 'SocketIOPong.data', 'btford.socket-io'])
.factory('chatSocket', ['socketFactory', function(socketFactory){
      return socketFactory();
    }
  ])
.config(['$routeProvider',function($routeProvider) {
    $routeProvider.when('/', {
      controller : 'ChatViewCntrl',
      templateUrl : 'partials/dashboard.html'
    }).otherwise({
      redirectTo: '/'
    });
  }]);
