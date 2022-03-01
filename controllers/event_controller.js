const express = require('express'),
  router = express.Router();

const Event = require('../models/event_model');
const User = require('../models/user_model');

router.get('/eventListings', function(request, response) {
    let events = Event.getAllEvents();
    let eventObj = Event.getAllEvents();
    let eventArray = [];
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
      eventsObj: eventObj,
      users: userObj
    });
});

router.get('/eventListings/:type', function(request, response) {
    let events = Event.getAllEvents();
    let eventObj = Event.getAllEvents();
    let eventList = [];
    let typeSave = request.params.type;
    for(type in events){
      if(events[type].type==typeSave){
        eventList.push(events[type]);
      }
    }
    let users = User.getAllUsers();
    let userObj = User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }
      response.setHeader('Content-Type', 'text/html')
      response.render("eventListings",{
        events: eventList,
        eventsObj: eventObj,
        users: userObj
      });
});


module.exports = router;
