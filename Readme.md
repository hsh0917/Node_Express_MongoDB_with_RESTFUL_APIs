# YelpCamp

Yelp Camp is a fun application that allows you to view campgrounds with a short description. Once you login or signup you can begin to create your own campgrounds that includes a title, image address and short description. You will also be able to leave a comment or edit a campground of yours. **You will need to click the link below to redirect to the full live version in order to signup. Otherwise you can use the username:test and password: password to give it a try here.

# Setup

Different setups are needed if you plan on using YelpCamp locally (or Cloud9) verus the Heroku + MongoLab setup.  This is accomplished using enviornment variables.

## Local/Cloud9 Setup

Run the following commands in the terminal.  Be sure to update information as necessary.

```
export DATABASEURL=mongodb://localhost/yelp_camp
export SESSION_SECRET=Whatever phrase you choose

```

## Heroku + MongoLab setup

Update the variables as follows:

**DATABASEURL** 'mongodb://\<dbuser>:\<dbpassword>@1234.mlab.<span></span>com:19990/yelp-camp'  
**SESSION_SECRET** 'Whatever phrase you choose'


This can be accomplished on the Heroku site by accessing the Config Vars on the Settings page.  
Alternatively this can be done on the command line with the following commands:

```
heroku config:set DATABASEURL='mongodb://\<dbuser>:\<dbpassword>@1234.mlab.<span></span>com:19990/yelp-camp'
heroku config:set SESSION_SECRET='Whatever phrase you choose'
```

# Deployed

The app is deployed [here](https://protected-falls-24808.herokuapp.com) at Heroku (also using [MongoLab](http://mlab.com)).
