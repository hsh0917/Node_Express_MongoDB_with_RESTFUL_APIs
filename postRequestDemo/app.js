var express = (require("express"));
var app = express();
var bodyParser = require("body-parser");  // Importing Body-Parser package
// Body-Parser will take the request body and parse it into a javascript object that we can use.

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
app.set("view engine", "ejs");

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res){
    res.render("home");
});

app.get("/friends", function(req, res){
    
    res.render("friends", {friends: friends});
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;       //  ** Body parser = npm install body-parser --save
    friends.push(newFriend);
    res.redirect("/friends");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!");
});