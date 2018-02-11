var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");


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
router.post("/", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    //campgrounds.push(newCampground);
    // Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    
    
});
// NEW - Show form to create new campground 
router.get("/new", function(req, res) {
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

module.exports = router;