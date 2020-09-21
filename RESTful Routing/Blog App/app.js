var express = require('express');
var bodyParser = require('body-parser');
var expressSanitizer = require("express-sanitizer");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var app = express();
var port = "5400";

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE/MODEL CONFIG

//======= SCHEMA =======
// titile
// image
// body
// created
//======= SCHEMA =======
var blogScehma = new mongoose.Schema({

    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogScehma);

// =========================== RESTFUL ROUTES ===========================

// INDEX ROUTE
app.get("/", (req, res)=>{
    res.render("index")
});

app.get("/blogs", (req, res)=>{
    Blog.find({}, (err, blogs)=>{
        if(err){
            console.log(":/ ERROR -- Somethning went wrong in fetching the blog posts" + err)
        } else{
            res.render("index", {blogs: blogs}) ;
        }
    });
});

// NEW ROUTE
app.get("/blogs/new", (req, res)=>{
    res.render("new");
})

//CREATE ROUTE
app.post("/blogs", (req, res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log(req.body);
    Blog.create(req.body.blog, (err, newBlog)=>{
        if(err){
            res.render("new");
        }else {
            res.redirect("/blogs");
        }
    });
});

//SHOW ROUTE
app.get("/blogs/:id", (req, res)=>{
    Blog.findById(req.params.id, (err, foundBlog)=>{
        if(err){
            res.redirect("/blogs");
        } else{
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", (req, res)=>{
    Blog.findById(req.params.id, (err, foundBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
})

// UPDATE ROUTE
app.put("/blogs/:id", (req, res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", (req, res)=>{
    Blog.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.redirect("/blogs");
        }else{
            res.redirect("/blogs");
        }
    });
});

// LISTENING EXPRESS SERVER
app.listen(port,(err)=>{
    if(err)
    {
        console.log("Server isn't responding" + err)
    }else{
        console.log("Server is up and running on port number: " + port)
    }
}); 