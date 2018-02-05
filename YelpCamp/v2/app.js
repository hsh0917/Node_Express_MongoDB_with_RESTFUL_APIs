var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name : String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {
        name: "Gatinou", 
        image: "https://images.unsplash.com/photo-1489593951513-b3a219ba7872?auto=format&fit=crop&w=1300&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D",
        description: "This is a huge granite hill, no bathrooms."
        
    }
    , function(err, campground){
        if(err){
            console.log(err);
        }else {
            console.log("Newly Create Campground: ");
            console.log(campground);
        }
    });

//Campground.find();


// var campgrounds = [
//             {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1475518845976-0fd87b7e4e5d?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "Gatinou", image: "https://images.unsplash.com/photo-1489593951513-b3a219ba7872?auto=format&fit=crop&w=1300&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "North Cake", image: "https://images.unsplash.com/photo-1470020337050-543c4e581988?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1475518845976-0fd87b7e4e5d?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "Gatinou", image: "https://images.unsplash.com/photo-1489593951513-b3a219ba7872?auto=format&fit=crop&w=1300&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"},
//             {name: "North Cake", image: "https://images.unsplash.com/photo-1470020337050-543c4e581988?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D"}
//         ];

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
               res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new");
});

// Show - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    //find the campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp server has started!");
});