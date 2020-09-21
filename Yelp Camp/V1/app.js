var express = require('express');
var app = express();
var port = 6400;
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [
    {name: "Mayur", image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Camp Fire", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Hill Top", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Mayur", image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Camp Fire", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Hill Top", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Mayur", image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Camp Fire", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Hill Top", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Mayur", image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Camp Fire", image: "https://pixabay.com/get/54e5dc474355a914f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"},
    {name: "Hill Top", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg"}
];

app.get('/', (req, res)=>{
    res.render("landing");
});

app.get("/campgrounds", (req, res)=>{
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res)=>{
    
    var name = req.body.name;
    var image = req.body.image;

    var data = {name: name, image: image};

    campgrounds.push(data);
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new", (req, res)=>{
    res.render("new.ejs");
});

app.listen(port, (err)=>{
    if(err){
        console.log("Something Went Wrong :/" +err);
    }
    else{
        console.log("Server Up and Running");
    }
});