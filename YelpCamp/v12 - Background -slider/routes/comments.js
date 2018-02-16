var express = require("express");
var router  = express.Router({mergeParams: true});  // {mergeParams: true} will merge the params from the campground and the comments together so that inside comment routes, we're able to
var Campground = require("../models/campground");   // access this req.params.id that we defined.
var Comment     = require("../models/comment");
var middleware  = require("../middleware");

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res) {
    // find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new", {campground: campground});
        }
    });
});

// Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
    ///lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                } else {
                    // add username and id to comment
                    comment.author.id   =   req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    console.log(comment);
                    res.redirect("/campgrounds/" + campground.id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id : req.params.id, comment: foundComment});
        }
    });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    console.log(req.body.comment);
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
        if (err){
            res.redirect("back");    
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    
    });
});

// COMNMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment Deleted!")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
});


module.exports = router;