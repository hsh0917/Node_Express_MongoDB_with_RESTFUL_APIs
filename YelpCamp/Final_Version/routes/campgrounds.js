var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
var geocoder   = require("geocoder");


// INDEX - Show all campgrounds
router.get("/", function(req, res){
        // Get all campgrounds
        Campground.find({}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else{
               res.render("campgrounds/index", {campgrounds: allCampgrounds});
           }
        });
        //res.render("campgrounds", {campgrounds: campgrounds});
});

// Create - Add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {name: name, price: price, image: image, description: description, author: author, location: location, lat: lat, lng: lng};
        //campgrounds.push(newCampground);
        console.log(req.user);
        
        // Create a new campground and save to database
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            }else{
                // redirect back to campgrounds page
                console.log(newlyCreated);
                res.redirect("/campgrounds");
            }
        });
    });
});


// NEW - Show form to create new campground 
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Show - shows more info about one campground
router.get("/:id", function(req,res){
    //find the campground with provided ID
    //Campground.findById(req.params.id, function(err, foundCampground){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){    
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    // is user logged in
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});   
    });
});


// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
        // find and update the correct campground
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updated){
            if (err){
                res.redirect("/campgrounds");
            } else {
                // redirect somewhere(show page)
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
     if (err) {
            res.redirect("/campgrounds");
       } else {
            res.redirect("/campgrounds");        
       }
   }) 
});




module.exports = router;