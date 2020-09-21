var express = require('express');
var app = express();
var port = 6500;

app.get("/", function(req, res) {

    res.send("Welcome to the express application");
});

app.get("/speak/:ex", function(req, res) {
    var animal = req.params.ex;
    var sounds = {
        dog: "whoof whoof",
        pig: "Oink",
        cat: "Meow"
    }
    var sound = sounds[animal];
    res.send("The " + animal + " says " + sound);
});

app.get("/repeat/:ar1/:ar2", function(req, res) {
    //console.log(req.params.ar1);
    var arg1 = req.params.ar1;
    var arg2 = req.params.ar2;
    var result = "";
    for(var i = 1; i<=Number(arg2); i++)
    {
        result += arg1 + " ";
    }
    res.send(result);
});

app.get("*", function(req, res) {

    res.send("Web Page Not Available... What are you doing with your life");
});

app.listen(port, function(err) {
    if(err)
    {
        console.log(err);
    }
    else {
        console.log("Server Up and Running on port: " + port);
    }
});