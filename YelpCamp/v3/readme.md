#Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

# Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template


RESTful Routes

name    url         verb    desc
====================================================================
INDEX   /dogs       GET     Display a list of all dog
NEW     /dogs/new   GEt     Displays form to make a new dog
CREATE  /dogs       POST    Add new dog to DB
SHOW    /dogs/:id   GET Shows info about one dog


# Refactor Mongoose Code
*   Create a models directory
*   Use module.exports
*   Require everything correctly!