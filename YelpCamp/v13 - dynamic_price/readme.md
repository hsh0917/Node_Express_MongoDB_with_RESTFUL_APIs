## Auth Pt 1 - Install
* Install all packages needed for authenticate
* Define User model

## Auth Pt.2 - Register
* Configure Passport
* Add register routes
* Add register template

## Auth Pt.3 - Login
* Add login routes
* Add login template

## Auth Pt.4 - Logout/Navbar
* Add logout routes
* Prevent user from adding a comment if not signed in
* Add links to navbar
* show/hide Auth links correctly

## Auth Pt.5 - Show/Hide Links
* Show/hide auth links in navbar correctly

## Refactor The Routes
* Use Express router to reorganize all routes

## Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

## Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

# Edittingg Campgrounds
* Add method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set problem  

/campgrounds/:id/edit
/campgrounds/:id/comments/:comment_id/edit

## Deleting campgrounds
* Add Destroy Routes
* Add Delete button

## Authorization 
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

## Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware


## Adding in Flash!
* Install and configure connect-flash
* Add bootStrap alerts to header