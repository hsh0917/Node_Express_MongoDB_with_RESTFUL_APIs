var express = require("express");

var app = express();



// "/" => "Hi there!"
app.get("/", function(req, res) {
    res.send("Hi there  asdasjda!");
});
// "/bye" => "GoodBye"
app.get("/bye", function (req, res) {
    res.send("GoodBye");
})
// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    console.log("someone made a request to /dog")
    res.send("MEOW!");
})

// Request object contains all the information about the incoming request.
app.get("/r/:subredditName", function(req, res) {
    var subreddit = req.params.subredditName;
    //console.log(req);
    console.log(req.params['subredditName']);
    //res.send("Welcome to a " + req.params['subredditName']);
    res.send("Welcome to a " + subreddit);
})

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    res.send("Welcome to a Comments page!!");
})

// *
app.get("*", function(req, res) {
    res.send("You are a star");
})

// Tess Express to listent for requests (start server)
app.listen(process.env.PORT, process.env.IP, function function_name() {
    console.log("Server has started!!!");
})