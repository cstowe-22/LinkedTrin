const express = require('express'),
router = express.Router();
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const KEYS = require('../config/keys.json');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user_model');
const Group = require('../models/group_model');
const Event = require('../models/event_model');
//keeping our secrets out of our main application is a security best practice
//we can add /config/keys.json to our .gitignore file so that we keep it local/private

let userProfile; //only used if you want to see user info beyond username


router.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 600000 //600 seconds of login time before being logged out
  },
  secret: KEYS["session_secret"]
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: KEYS["client_id"],
    clientSecret: KEYS["client_secret"],
    callbackURL: "http://linkedtrinity.herokuapp.com/auth/google/callback"
    //todo: port==process.env.PORT? :
  },
  function(accessToken, refreshToken, profile, done) {
    userProfile = profile; //so we can see & use details form the profile
    return done(null, userProfile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

/*
  This triggers the communication with Google
*/
router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email',  "https://www.googleapis.com/auth/calendar", 'profile']
  }));

/*
  This callback is invoked after Google decides on the login results
*/
router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/error?code=401'
  }),
  function(request, response) {
    console.log("Clifford sucks");

    let userData = userProfile._json;
    console.log("userData: " + userData);
    // let uuid = uuidv4();//Generate new UUID;
    let users = User.getAllUsers();
    let userEmails = [];
    for(user in users){
      userEmails.push(users[user].email);
    }

    console.log(userEmails);

    let foundEmail = userEmails.find(element => element == userData.email);

    /* {
        sub: '109374097182939153766',
        name: 'Nicholas Eng',
        given_name: 'Nicholas',
        family_name: 'Eng',
        picture: 'https://lh3.googleusercontent.com/a/AATXAJzwI7OrMzLjfor31ybvPnb0C48aEg0ROiX26gPU=s96-c',
        email: 'nicholas.eng22@trinityschoolnyc.org',
        email_verified: true,
        locale: 'en',
        hd: 'trinityschoolnyc.org'
      }*/

    if(typeof(foundEmail) == "undefined") {
      let users = JSON.parse(fs.readFileSync('./data/users.json'));
      let newUser ={
        "fullName": userData.name, //firstname.lastname@
        "email": userData.email
      }
      users[userProfile.id] = newUser;
      fs.writeFileSync('./data/users.json', JSON.stringify(users));
    }

    //Check to see if email exists

    response.redirect('/');
  });

router.get("/auth/logout", (request, response) => {
  request.logout();
  response.redirect('/');
});

router.post('/auth', function(request, response) {
    let uuid = uuidv4();//Genetate new UUID;
    let description = request.body.description;
    let date = request.body.date;
    let path = title.replace(' ', '-').toLowerCase();
    let organization = request.body.organization;
    if(title&&description&&date){
      let events = JSON.parse(fs.readFileSync('data/events.json'));
      let newMusician = {
        "title": title,
        "path": path,
        "description": description,
        "organization": name,
        "date": date,
      }
      events[title] = newEvent;
      fs.writeFileSync('data/events.json', JSON.stringify(events));
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/event/"+stageName);
    }else{
      response.status(400);
      response.setHeader('Content-Type', 'text/html')
      response.render("error", {
        "errorCode":"400"
      });
    }
});


module.exports = router;
