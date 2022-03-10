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
    callbackURL: "http://localhost:3000/auth/google/callback"
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
    console.log(userProfile);
    let userData = userProfile._json;
    console.log("Userdata: " + userData._json.name);
    let uuid = uuidv4();//Generate new UUID;
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
      users[uuid] = newUser;
      fs.writeFileSync('./data/users.json', JSON.stringify(users));
    }

    //Check to see if email exists

    response.redirect('/');
  });

router.get("/auth/logout", (request, response) => {
  request.logout();
  response.redirect('/');
});

router.get("/settings", (request, response) => {
  console.log("In settings --------------")
  // Get information from google passport
  // Figure out way to set session/logged in data
  console.log(request);
  // let userID =
  let users = User.getAllUsers();
  console.log(user);
  // let user = users.find(())


});


//Check to see if useremail already exists


module.exports = router;
