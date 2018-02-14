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
router.post("/", isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, image: image, description: description, author: author};
    //campgrounds.push(newCampground);
    console.log(req.user);
    
    // Create a new campground and save to database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            // redirect back to campgrounds page
            console.log(newlyCreated)
            res.redirect("/campgrounds");
        }
    });
    
    
});
// NEW - Show form to create new campground 
router.get("/new", isLoggedIn, function(req, res) {
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
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    // is user logged in
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});   
    });
});


// UPDATE CAMPGROUND ROUTE
router.put("/:id/", function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated){
        if (err){
            res.redirect("/campgrounds");
        } else {
            // redirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
     if (err) {
            res.redirect("/campgrounds");
       } else {
            res.redirect("/campgrounds");        
       }
   }) 
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
            if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if (err){
                    res.redirect("back");
                } else {
                    // does user own the campground?
                    console.log(foundCampground.author.id);
                    console.log(req.user._id);
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();  
                    } else {
                        res.redirect("back");
                    }
                }
            });
        } else {
            res.redirect("back"); // This makes user back to where they came from.
        }
}

module.exports = router;