const express = require('express'),
  router = express.Router();
  const app = express();
  const fs = require('fs');

const Event = require('../models/event_model');
const User = require('../models/user_model');
const Group = require('../models/group_model');

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

// let users = User.getallusers;
// event.attendeeNames = event.attendees.map(function(attendee) { return users[attendee].fullName; });

router.get('/eventListings', loggedIn, async function(request, response) {
    let events = await Event.getAllEvents();
    let eventObj = await Event.getAllEvents();
    let eventArray = [];
    for(title in events){
      eventArray.push(events[title])
    }
    let users = await User.getAllUsers();
    let userObj = await User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }
    response.setHeader('Content-Type', 'text/html');
    console.log("test");
    console.log("Req User: " + JSON.stringify(request.user));
    response.render("eventListings", {
      events: eventArray,
      eventsObj: eventObj,
      users: userObj,
      user: request.user
    });
});

router.get('/eventListings/:type', loggedIn, async function(request, response) {
    let events = await Event.getAllEvents();
    let eventObj = await Event.getAllEvents();
    let eventList = [];
    let typeSave = request.params.type;
    for(type in events){
      if(events[type].type==typeSave){
        eventList.push(events[type]);
      }
    }
    let users = await User.getAllUsers();
    let userObj = await User.getAllUsers();
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

router.get('/event/:path', loggedIn, async function(request, response) {
    let events = await Event.getAllEvents();
    let eventObj = await Event.getAllEvents();
    let userId = await User.getId(request.user._json.email);
    let isLeader = false;
    let selectedEvent = {};
    let path = request.params.path;
    for(eventEntry in events){
      if(events[eventEntry].path==path){
        selectedEvent = events[eventEntry];
        isLeader = await Group.isLeader(userId, selectedEvent.organization);
      }
    }
    let users = await User.getAllUsers();
    let userObj = await User.getAllUsers();
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
        user: request.user,
        isLeader: isLeader
      });
});

router.get('/eventCreation', loggedIn, async function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    let users = await User.getAllUsers();

    response.render("eventCreation",{
      user: request.user,
      users: users,
      groupPath: request.query.group
    }
  );
});

router.post('/eventCreation', loggedIn, async function(request, response) {
    let title = request.body.title;
    let description = request.body.description;
    let date = request.body.date;
    let path = title.replace(' ', '-').toLowerCase();
    let organization = request.body.organization;
    let type = request.body.type;
    let members = request.body.memberList;
   if(0==0){
      let events = await JSON.parse(fs.readFileSync('./data/events.json'));
      let newEvent = {
        "date": date,
        "description": description,
        "attendees": members,
        "organization": organization,
        "path": path,
        "title": title,
        "type": type
      }
      events[title] = newEvent;
      await fs.writeFileSync('./data/events.json', JSON.stringify(events));
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
