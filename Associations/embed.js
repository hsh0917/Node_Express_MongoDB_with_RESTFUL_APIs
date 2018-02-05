var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});


//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]  // it need to be the name of the schema.   One to Many relationship
});


var User = mongoose.model("User", userSchema);


var Post = mongoose.model("Post", postSchema);

// var newUser = new User({
//     email: "Youngah3709@gmail.com",
//     name: "Youngah Kwak"
// });

// newUser.posts.push({
//     title: "How to bre polyjuice potion",
//     content: "Just kidding. Go to potions class to learn it"
// });

// newUser.save(function(err, user){
//   if(err){
//       console.log(err)
//   } else {
//       console.log(user);
//   }
// });

// var newPost = new Post({
//     title: "Reflections on apples",
//     content: "They are delicious"
// });

// newPost.save(function(err, post){
//   if(err){
//       console.log(err)
//   } else {
//       console.log(post);
//   }
// });

User.findOne({name: "Youngah Kwak"}, function(err, user){
    if(err){
        //console.log(err);
    } else {
        user.posts.push({
            title: "3 Things I really hate",
            content: "Cinnamon, Cinnamon, Cinnamon"
        });
        user.save(function(err, user){
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});