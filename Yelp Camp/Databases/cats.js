var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temprament: String
});

var Cat = mongoose.model("Cat", catSchema);

Cat.create({
    name: "SnowBell",
    age: 15,
    temprament: "Bland"
}, (err, cat)=>{
    if(err)
    {
        console.log("Error" + err)
    }
    else{
        console.log(cat)
    }
});

Cat.find({}, (err, cat)=>{
    if(err)
    {
        console.log("Error" + err)
    }
    else{
        console.log(cat);
    }
}); 

