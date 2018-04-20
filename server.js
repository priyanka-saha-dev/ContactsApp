var express = require('express');
var app = express();

var bodyparser = require('body-parser');

var mongojs = require('mongojs');
var db = mongojs('contactList', ['contactList']);

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

app.get('/contactList', function (req, res) {
    console.log("Getting all contact list from server");
    db.contactList.find(function (err, docx) {
        console.log(docx);
        res.status(200).json(docx);
    });
});

app.get('/contactList/:id', function (req, res) {
    
    var id = req.params.id;
    console.log("Getting contact list from server for ID : " + id);
    
    db.contactList.findOne({ _id: mongojs.ObjectId(id) }, function (err, docx) {
        console.log(docx);
        res.status(200).json(docx);
    });
});

app.post('/contactList', function (req, res) {
    console.log(req.body);
    db.contactList.insert(req.body, function (err, docx) {
        res.status(200).json(docx);
    });

});

app.delete('/contactList/:id', function (req, res) {
    var id = req.params.id;
    console.log("deleting for ID : " + id);
    db.contactList.remove({ _id: mongojs.ObjectId(id) }, function (err, docx) {
        res.status(200).json(docx);
    });

});

app.put('/contactList/:id', function (req, res) {
    var id = req.params.id;
    console.log("updating for ID : " + id);

    console.log("updating for name : " + req.body.name);
    console.log("updating for email : " + req.body.email);
    console.log("updating for number : " + req.body.number);
    var queryBody = {
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name, email: req.body.email, number: req.body.number } },
        new: true
    }
    db.contactList.findAndModify(queryBody, function (err, docx) {
            res.status(200).json(docx);
    });
});

app.listen(8080);
console.log("Server running on port 8080");