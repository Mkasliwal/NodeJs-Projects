var mongoose = require("mongoose");
var Campground = require("./modles/campground");
var Comment = require("./modles/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://www.photosforclass.com/download/px_1061640",
        description: "abcdf"
    },
    {
        name: "Cloud's Rest",
        image: "https://www.photosforclass.com/download/pb_5298769",
        description: "abcdf"
    },
    {
        name: "Cloud's Rest",
        image: "https://www.photosforclass.com/download/px_450441",
        description: "abcdf"
    },
]
function seedDB(){
    // Remove All Campgrounds
    Campground.remove({}, (err)=>{
        if(err)
        {
            console.log("Error" + err);    
        }else{
            console.log("Campgrounds Removed from DB");
            // adding campgrounds
            data.forEach((seed)=>{
                Campground.create(seed, (err, campground)=>{
                    if(err)
                    {
                        console.log(err)
                    }else{
                        console.log("data added")
                        // adding comments
                        Comment.create(
                            {
                                text: "Nice Place",
                                author: "Mayur Kasliwal"
                            }
                        ), (err, comment)=>{
                            if(err){
                                console.log("Comment error" + err)
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("New comment created")
                            }
                        }
                    }
                });
            });
        }
    });
}

module.exports = seedDB;