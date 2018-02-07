#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

# Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template



# Refactor Mongoose Code
*   Create a models directory
*   Use module.exports
*   Require everything correctly!


# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add the Comment Model!
* Make our errors go away!
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form


RESTful Routes

name    url         verb    desc
====================================================================
INDEX   /dogs       GET     Display a list of all dog
NEW     /dogs/new   GEt     Displays form to make a new dog
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET Shows info about one dog

INDEX   /campgrounds
NEW     /campgrounds/new
CREATE  /campgrounds
SHOW    /campgrounds/:id

NEW     campgrounds/:id/comments/new   GET
Create  campgrounds/:id/comments       POST
