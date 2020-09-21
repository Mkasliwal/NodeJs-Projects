var express = require('express');
var app = express();
var port = 6400;
var bodyParser = require('body-parser');

// =========================== database =============================== 

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});

// SCHEMA SETUP

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Hill Top",
//     image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507440762673d4914fcc_340.jpg",
//     description: "This is a beautiful hill top with amazing plantation of conifer trees!"
// }, (err, campground)=>{
//     if(err){
//         console.log("Error" + err);
//     }else{
//         console.log(campground);
//     }
// });


// ============================== RESTFUL ROUTE STRUCTURE ========================================
      
//             name         url                 verb                   description
//           =====================================================================================
//            INDEX        /campgrounds         GET             Display a list of Campgrounds              
//            NEW          /campgrounds/new     GET             Display form to create Campgrounds              
//            CREATE       /campgrounds         POST            Add new campground to DataBase       
//            SHOW         /campgrounds/:id     GET             Show the info of one campground       

// ===============================================================================================


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    res.render("landing");
}); 

// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", (req, res)=>{
    
    //Get all data from DB
    Campground.find({}, (err, allCampground)=>{
        if(err){
            console.log("Error" + err)
        }else{
            res.render("index", {campgrounds: allCampground});
        }
    });
});

// CREATE ROUTE - create a new data into the database
app.post("/campgrounds", (req, res)=>{
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    
    var data = {name: name, image: image, description: desc};

    // create a campground and save it to DB
    Campground.create(data, (err, newlyCreated)=>{
        if(err)
        {
            console.log(err)
        }else{
            res.redirect("/campgrounds"); 
        }
    });
});

// NEW ROUTE - show form to create a campground
app.get("/campgrounds/new", (req, res)=>{
    res.render("new.ejs");
});

// SHOW ROUTE - show the info of one campground
app.get("/campgrounds/:id", (req, res)=>{

    // find the campground with the provided id --- Using mongoose method findById() ----
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.log("Error: " + err)
        }else{
            // render the show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

// LISTENING THE EXPRESS SERVER
app.listen(port, (err)=>{
    if(err){
        console.log("Something Went Wrong :/" +err);
    }
    else{
        console.log("Server Up and Running");
    }
});