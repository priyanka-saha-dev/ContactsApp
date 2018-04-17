var express = require('express');
var app  = express();

app.use(express.static(__dirname+"/public"));

app.get('/contactList', function(req, res){

    console.log("Getting all contact list from server");

    person1 = {
        name : 'Priyanka Saha',
        number : '7278952122',
        email : 'ps@mail.com',
    };

    person2 = {
        name : 'Tuhin Raha',
        number : '8013584734',
        email : 'tr@mail.com',
    };

    person3 = {
        name : 'Mitra Saha',
        number : '9830117785',
        email : 'ms@mail.com',
    };

    var contactList = [person1, person2, person3];

    res.json(contactList);

});

app.listen(8080);
console.log("Server running on port 8080");