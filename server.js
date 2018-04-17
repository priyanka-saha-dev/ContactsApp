var express = require('express');
var app  = express();

var bodyparser = require('body-parser');

var mongojs = require('mongojs');
var db  = mongojs('contactList',['contactList']);

app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());

app.get('/contactList', function(req, res){

    console.log("Getting all contact list from server");

    db.contactList.find(function (err, docx){
        //if(!err) {
            console.log(docx);
            res.status(200).json(docx);
        //}

    });
});

app.post('/contactList', function(req, res){
    console.log(req.body);
    db.contactList.insert(req.body, function(err, docx) {
        res.status(200).json(docx);
    });
    
});

app.listen(8080);
console.log("Server running on port 8080");