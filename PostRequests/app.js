var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5400;

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var friends = ["Tanmay", "Divyansh", "Anil", "Vikednu"];

app.get("/", (req, res)=> {
    res.render("home");
});

app.post("/addfriend", (req, res)=> {
    var newFriends = req.body.newFriend;
    friends.push(newFriends);
    //console.log(req.body);
    res.redirect("/friends");
});

app.get("/friends", (req, res)=> {
    res.render("friends", {friends: friends});
});

app.listen(port, (err)=> {
    if(err) {
        console.log(err);
    }
    else {
        console.log("Server running on port number: " + port);
    }
});