const express = require('express'),
  router = express.Router();

const Event = require('../models/event_model');
const User = require('../models/user_model');

router.get('/eventListings', function(request, response) {
    let events = Event.getAllEvents();
    let eventArray = [];
    response.status(200);
    for(title in events){
      eventArray.push(events[title])
    }

    let users = User.getAllUsers();
    let userObj = User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }

    response.setHeader('Content-Type', 'text/html')
    response.render("eventListings", {
      events: eventArray,
      users: userObj
    });
});

module.exports = router;
