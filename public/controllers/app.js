var contactsApp = angular.module('contactsApp', []); 

contactsApp.controller('contactsCtrl', ['$scope', '$http', function($scope, $http) { 
    console.log("Hello World from controller"); 

    $scope.name = 'Priyanka Saha';
    $scope.number = '7278952122';
    $scope.email = 'ps@mail.com';
}]);