var mongoose = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); // What this will do is take our passport local mongoose package that we required.

module.exports = mongoose.model("User", UserSchema);