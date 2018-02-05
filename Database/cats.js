var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app") // This is the name for our database. 


var catSchema = new mongoose.Schema({
   name: String,
   age: Number,
   temperament: String
});


//adding a new cat to the DB    (((((((((1)))))))))))
 var Cat = mongoose.model("Cat", catSchema); // This compiled it into a model and we save it to a variable cat. "Cat" is the name of our singular version of our model.

// Cat.find, Cat.create, cat.remove, cat.update

/*var george = new Cat({
   name: "Mrs. Norris",
   age: 7,
   temperament: "Evil"
});

george.save(function(err, cat){   // Once I save, it will try to be added to the database. Then, it will be repassing in the function,
   if(err){                       // 
      console.log("something went wrong!");
   }else{
      console.log("we just saved a cat to the DB");
      console.log(cat);
   }
})  */


Cat.create({
   name: "Snow White",
   age: 15,
   temperament: "Bland"
}, function(err, cat){
      if(err){
      console.log("Oh No, Error");
      console.log(err);
   }else{
      console.log(cat);
   }
});


// retrieve all cats from the DB and console.log each one   ((((((((2))))))))))

Cat.find({}, function(err, cats){  // function is for checking whether it has an error or not.
   if(err){
      console.log("Oh No, Error");
      console.log(err);
   }else{
      console.log("All the Cats.....");
      console.log(cats);
   }
});
