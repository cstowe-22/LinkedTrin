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

router.get('/event/:path', function(request, response) {
    let events = Event.getAllEvents();
    let eventObj = Event.getAllEvents();
    let selectedEvent = {};
    let path = request.params.path;
    for(eventEntry in events){
      if(events[eventEntry].path==path){
        selectedEvent = events[eventEntry];
      }
    }
    let users = User.getAllUsers();
    let userObj = User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }
    // TODO: add logic after user is figured route
    let followed = 0;
      response.setHeader('Content-Type', 'text/html')
      response.render("event",{
        event: selectedEvent,
        users: userObj,
        followed: followed
      });
});

router.post('/eventCreation', function(request, response) {
    let title = request.body.title;
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
        "organization",
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
