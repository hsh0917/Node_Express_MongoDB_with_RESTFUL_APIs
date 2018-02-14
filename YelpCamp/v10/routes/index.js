var express     =   require("express");
var router      =   express.Router();
var User        =   require("../models/user")
var passport    =   require("passport");


// Root route
router.get("/", function(req, res){
    res.render("landing");
});



// show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username});
    var password = req.body.password;
    User.register(newUser, password, function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login", function(req, res) {
    res.render("login");
});

// Handling login logic
router.post("/login", passport.authenticate("local", {   // app.post("login", middleware, callback)
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
    res.send("Login happens here");
});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;