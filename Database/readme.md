#Databaseahead of time
 
##Intro to Database
* What is a database?
    - A collection of information/data
    - Has an interface, some sore tof language, some sort of technology or tools to interact with the data.
    - then there are two broad categories of databases SQL, and NoSQL
* SQL(relational) vs NoSQL(Non-relational)
    -  No SQL has much more flexible structure
 

# Intro to MongoDB
* What is MongoDB
* why are we using it?
*  Let's install 

# Our First Mongo Commands
* Mongod
* mongo     // start console
* help
* show dbs
* use       // use.demo   : to creat new database
* insert    // db.dogs.insert({name:"luch", breed:"Mutt"})
* find      // db.dogs.find()
* update    // db.dogs.update({name:"lucy"}, {breed: "labradoodle"})  // db.dogs.update({name: "rusty"}, {$set: {name: "Tater", isCute: true}})
* remove    // db.dogs.remove({breed: "labradoodle"})
 

# Mongoose
npm install mongoose --save

* What is Mongoose?
    - Mongoose is what's known as an ODM (Object data mapper). What it really means is that it is a way for us to write javascript inside of our javascript file,
      and the javascript code will interact with our database.
    - Mongoose is an elegant Mongo DB object modeling for node.js. it is a tooll that helps us interact with
      MongoDB insde of javascript files