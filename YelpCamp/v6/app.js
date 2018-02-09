var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    User        = require("./models/user"),
    Comment     = require("./models/comment");


mongoose.connect("mongodb://localhost/yelp_camp_6");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
console.log(__dirname + "public");
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){      // This will be called on every route. What this does is pass that request at user to every single template and there an easy way
    res.locals.currentUser = req.user; // whenever we put in the res.locals is what's available instead of our templates.
    next();                            // we need to have the next() in order to move on to that next middleware which will actually be the route handler in most cases.
})

app.get("/", function(req, res){
    res.render("landing");
});
// INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
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

//Create - Add new campground to database
app.post("/campgrounds", function(req, res){
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
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// Show - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
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



//  ===============================
//  COMMENTS ROUTES
//  ===============================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    ///lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground.id);
                }
            })
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
})


// ==========
// AUTH ROUTE
// ==========
app.get("/register", function(req, res) {
    res.render("register");
})

//handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username});
    var password = req.body.password;
    User.register(newUser, password, function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        })
    });
})

// Show login form
app.get("/login", function(req, res) {
    res.render("login");
});

// Handling login logic
app.post("/login", passport.authenticate("local", {   // app.post("login", middleware, callback)
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req, res) {
    res.send("Login happens here");
});

// login route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});















