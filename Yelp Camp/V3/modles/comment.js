var mongoose = require("mongoose");

var commmentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commmentSchema);