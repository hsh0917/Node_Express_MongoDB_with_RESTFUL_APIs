var express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    localStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");
    
mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({  // We have to pass in three different options in order for it to work with passport a secret and this
    secret: "Resty is the best and cutest dog in the world",  //  The secret will be used to encode or decode the information in the the sessions. it can be anything at all.
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize()); //1:  This code is basically setting passport up so that it will work in our application
app.use(passport.session()); //2:  we need these two methods anytime we

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());   // There are responisble for reading the session taking the data from the session that's
passport.deserializeUser(User.deserializeUser()); // encoded and unencoded it


//=======================
// ROUTES
//=======================

app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){  // What isLoggedIn do is when a request comes in a Get request to '/secret'. it is gonna run isLoggedIn before it does anything else.
    res.render("secret");
});

// AUTH ROUTE

// show sign up form
app.get("/register", function(req, res) {
    res.render("register");
});

// handling user sign up
app.post("/register", function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function(){  // passport.authenticate will actually log the user in who will take care of everything in the session. 
            console.log("success");
            res.redirect("/secret");                          // it will store the correct information. it will run the serialized user method that we specified.
            console.log("success22222");
            
        });
    });
});

// LOGIN ROUTES
// Render login form
app.get("/login", function(req, res) {
    res.render("login");
});

// Login logic
// middleware
app.post("/login", passport.authenticate("local", { 
        successRedirect: "/secret",
        failureRedirect: "/login" 
    }), function(req, res){
    
});

app.get("/logout", function(req, res){
    req.logout();  // What's happening is that passport is destroying all the user data in the session. It is no longer keeping track of this user's data in the session from request to request
    res.redirect("/");
    
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Started!!");
});