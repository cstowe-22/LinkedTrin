const express = require('express'),
  router = express.Router();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const KEYS = require('../config/keys.json');
const { v4: uuidv4 } = require('uuid');
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
    scope: ['email']
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
    let uuid = uuidv4();//Genetate new UUID;
    console.log("Id: " + uuid);
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

/*
"6d6d812a-557a-48ca-ba5c-651eb84f0ad1": {
  "fullName": "Kai Williams",
  "email": "kai.williams@trinityschoolnyc.org",
  "graduationYear": "",
  "groupLeadership": [
    "7c095172-730c-11ec-959f-47934c7cc5bd",
    "3aaa68f2-4db4-4917-b593-2b4474420bff?",
    "4auccf1f-39da-41b4-afda-b95caa2d4636"
  ],
  "followedGroups": [

  ],
  "followedEvents": [
  ]
}
*/


//Check to see if useremail already exists


module.exports = router;
