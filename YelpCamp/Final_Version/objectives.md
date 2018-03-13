#Intro to Node

*What is Node?

*why are we learning it?
    *It's popular! 
    * JavaScript
*(it doesn't matter)

up until a few years ago, all javascript that you wrote had to run in the browser.
it was the only place for you to excute javaScript code and that meant that all javaScript that you wrote
was Only front end code. You couldn't do anything server side because the only place that it could run is the browser.
But that all changed a few years ago when Node.js came along. so all that node is a way for us to write javascript code on the server side.

#Using Node

*Interact with Node Console (node)
* Run a file with node (node <fileName>)

#Intro to NPM

* Define NPM
    it stands for node package manager and it is awesome tol that comes with node.js
* Explain why NPM is awesome 
    it is easy to use, and it is also centralized repository of almost 200,000 different packages
* Intro the packages we will end up using


# Installing and Using Packages

* Use 'npm install' to install a package
* Use 'require()' to include a package 
* 

# Introduction to Express

* why are we using Express
    express is a very lightweight framework, so it doesn't hide things from you
    it doesn't do things you don't expect it to do.


#NPM Init and Package.json
* install express --save
    This defines a dependency in the package.json

# More Routing!

* Show the '*' route matcher
    It will match anything that comes in at all

    If I want to have some sort of error message or area of web page show a user anytime
    they try and access a route that isn't defined or one that you're not expecting
    ++ order of route is matters.
    
* Write routes containing route parameters
 e.g) app.get("/r/:subredditName", function(req,res{
     });
    
* Discuss route order
    One of those callback function is running if it's being trggered then we're done, so
    that request has been handled and it never moves on to other routes.

-------Intermediate Express ----------

# Rendering HTML and Templates

npm install ejs --save

* Use res.render() to render HTML(from an EJS file)
* Explain what EJS is and why we use it
* Pass variables to EJS templates


# <%= %>   
Value that is returned whatever this code returns inside of here will be rendered to the page.
It will be added to the HTML.

# <% %>
This is not supposed to display the brackes such as if statement.
so whenever we are doing logic control flow stuff, if statements and loops, 
we don't use equal sign.

# Post Requests!!!

* Write post routes, and test them with Postman
* Use a form to send a post request
* Use body parser to get form data

# Making a request

https://github.com/request/request