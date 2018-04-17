var contactsApp = angular.module('contactsApp', []); 

contactsApp.controller('contactsCtrl', ['$scope', '$http', function($scope, $http) { 
    console.log("Hello World from controller"); 

    $http.get('/contactList').then(successCallback, errorCallback);

    function successCallback(response){
        $scope.contactList = response.data;
        $scope.message = 'Bingo!!'
    }
    function errorCallback(error){
        $scope.message = 'Problem occured..';
    } 
    
}]);