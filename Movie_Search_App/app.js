var express = require('express');
var ejs = require('ejs');
var request = require('request');
var app = express();
var port = 6500;

app.set("view engine","ejs");

app.get("/", (req, res)=> {
    res.render("search");
});

app.get("/results", (req, res)=> {
    //console.log(req.query.search)
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, (error, response, body)=> {
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

app.listen(port, (err)=> {
    if(err){
        console.log(err)
    } else {
        console.log("Server Up and Running")
    }
});
