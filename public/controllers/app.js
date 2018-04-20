var contactsApp = angular.module('contactsApp', []);

contactsApp.controller('contactsCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Contacts App controller");

    var refresh = function () {
        $http.get('/contactList').
            then(function (response) {
                console.log("Refresh success : " + response.status);
                $scope.contactList = response.data;
                $scope.message = 'Bingo!!';
                $scope.enableUpdate = false;
            }, function (error) {
                console.log("Refresh failure : " + error);
                $scope.message = 'Problem occured while refresh..';
            });
    };

    refresh();

    $scope.addContact = function () {

        if ($scope.contact && $scope.contact.name && $scope.contact.email && $scope.contact.number) {
            $http.post('/contactList', $scope.contact)
                .then(function (response) {
                    console.log("Add contact success : " + response.status);
                    $scope.contact = {};
                    $scope.message = 'Bingo!!';
                    refresh();
                }, function (error) {
                    console.log("Add contact failure : " + error);
                    $scope.message = 'Problem occured while saving..';
                });
        }

    };

    $scope.deleteContact = function (id) {

        console.log("Delete for : " + id);
        $http.delete('/contactList/' + id)
            .then(function (response) {
                console.log("Delete contact success : " + response.status);
                $scope.contact = {};
                $scope.message = 'Bingo!!';
                refresh();
            }, function (error) {
                console.log("Add contact failure : " + error);
                $scope.message = 'Problem occured while deleting..';
            });
    };

    $scope.editContact = function (id) {

        console.log("Edit for : " + id);
        $http.get('/contactList/' + id)
            .then(function (response) {
                console.log("Get contact - " + id + " success : " + response.status);
                $scope.contact = response.data;
                $scope.message = 'Bingo!!';
                $scope.enableUpdate = true;
            }, function (error) {
                console.log("Get contact - " + id + " failure : " + error);
                $scope.message = 'Problem occured while fetching contact#' + id;
            });
    };

    $scope.updateContact = function () {

        console.log("Updating contact for : " + $scope.contact._id);
        $http.put('/contactList/' + $scope.contact._id, $scope.contact)
            .then(function (response) {
                console.log("Update contact - " + $scope.contact._id + " success : " + response.status);
                $scope.contact = {};
                $scope.message = 'Bingo!!';
                refresh();
            }, function (error) {
                console.log("Update contact - " + $scope.contact._id + " failure : " + error);
                $scope.message = 'Problem occured while fetching contact#' + $scope.contact._id;
            });
    };

}]);