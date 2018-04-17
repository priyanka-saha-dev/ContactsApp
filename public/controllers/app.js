var contactsApp = angular.module('contactsApp', []);

contactsApp.controller('contactsCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World from controller");

    var refresh = function () {
        $http.get('/contactList').
            then(function (response) {
                console.log("Refresh success : " + response.status);
                $scope.contactList = response.data;
                $scope.message = 'Bingo!!';
            }, function (error) {
                console.log("Refresh failure : " + error);
                $scope.message = 'Problem occured while refresh..';
            });
    };

    refresh();

    $scope.addContact = function () {
        $http.post('/contactList', $scope.contact).then(function (response) {
            console.log("Add contact success : " + response.status);
            $scope.contact = {};
            $scope.message = 'Bingo!!';
            refresh();
        }, function(error) {
            console.log("Add contact failure : " + error);
            $scope.message = 'Problem occured while saving..';
        });
    };

}]);