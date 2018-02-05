var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

var campgrounds = [
            {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1475518845976-0fd87b7e4e5d?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "Gatinou", image: "https://images.unsplash.com/photo-1489593951513-b3a219ba7872?auto=format&fit=crop&w=1300&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "North Cake", image: "https://images.unsplash.com/photo-1470020337050-543c4e581988?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1475518845976-0fd87b7e4e5d?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "Gatinou", image: "https://images.unsplash.com/photo-1489593951513-b3a219ba7872?auto=format&fit=crop&w=1300&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
            {name: "North Cake", image: "https://images.unsplash.com/photo-1470020337050-543c4e581988?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"}
        ];

app.get("/", function(req, res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
        res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds")
    
} )

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!")
})