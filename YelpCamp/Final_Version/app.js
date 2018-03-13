var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),  // be sure that the this line should come before passport configuration.
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    User        = require("./models/user"),
    methodOverride  = require("method-override"),
    Comment     = require("./models/comment");

// Requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_12";
mongoose.connect(url);  // export DATABASEURL=mongodb://localhost/yelp_camp_12
// mongoose.connect("mongodb://seokhwan:0917@ds241658.mlab.com:41658/yelpcamp-seokhwan");  // heroku config:set DATABASEURL=mongodb://seokhwan:0917@ds241658.mlab.com:41658/yelpcamp-seokhwan

app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();  //seed the database

app.locals.moment = require("moment");

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();                            // we need to have the next() in order to move on to that next middleware which will actually be the route handler in most cases.
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);  // This append "/campgrounds" in front of every single routes of campgrounds.js
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){  // process.env is the environment where this code is being run. So process.env.Port on cloud9 maybe different than on Heroku.
    console.log("The YelpCamp server has started!");
});














