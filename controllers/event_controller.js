const express = require('express'),
  router = express.Router();
  const app = express();
  const fs = require('fs');

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
      users: userObj,
      user: request.user
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
        users: userObj,
        user: request.user
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
        followed: followed,
        user: request.user
      });
});

router.get('/eventCreation', function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("eventCreation",{
      user: request.user
    }
  );
});

router.post('/eventCreation', function(request, response) {
    let title = request.body.title;
    let description = request.body.description;
    let date = request.body.date;
    let path = title.replaceAll(' ', '-').toLowerCase();
    let organization = request.body.organization;
    let type = request.body.type;
    let memberList = request.body.members;
    let members = memberList.split(",");
   if(0==0){
      let events = JSON.parse(fs.readFileSync('./data/events.json'));
      let newEvent = {
        "title": title,
        "path": path,
        "description": description,
        "organization": organization,
        "date": date,
        "type": type,
        "members": members
      }
      events[title] = newEvent;
      fs.writeFileSync('./data/events.json', JSON.stringify(events));
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/eventListings");

   }else{
     response.status(400);
     response.setHeader('Content-Type', 'text/html')
     response.render("error", {
       "errorCode":"400"
     });
   }
});


module.exports = router;
