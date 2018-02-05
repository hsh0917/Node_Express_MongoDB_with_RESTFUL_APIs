var express = require("express");

var app = express();

app.use(express.static("public"));  // for img, css and javaScript
app.set("view engine", "ejs");  //  

app.get("/", function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
    var thing = req.params.thing;
    var thingVar = {thingVar: thing};
    res.render("love", thingVar);
});

app.get("/posts", function(req, res) {
    var posts = [
    {title: "post 1", author: "Susy"},
    {title: "My pet Koon", author: "Seokhwan"},
    {title: "Can you believe it?", author: "Young"}
    ];
    res.render("posts", {posts: posts});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});