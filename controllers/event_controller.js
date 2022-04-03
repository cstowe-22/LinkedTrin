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

router.get('/eventListings/:item', loggedIn, async function(request, response) {
    let events = await Event.getAllEvents();
    let eventObj = await Event.getAllEvents();
    let eventList = [];
    let itemSave = request.params.item;
    for(item in events){
      if(events[item].type==itemSave){
        eventList.push(events[item]);
      }
      else if(events[item].organization==itemSave){
        eventList.push(events[item]);
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
        users: userObj,
        user: request.user
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
    for(id in users) {
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
        isLeader: isLeader,
        path: path
      });
});

router.post('/event/:path', loggedIn, async function(request, response) {
  let path = request.body.path;
  let organization = request.body.organization;
  let date = request.body.date;
  let title = request.body.title;
  let memberList = request.body.memberList;
  let description = request.body.description;
  let type = request.body.type;
  if(0==0){
      let updateEvent = {};
     let events = await JSON.parse(fs.readFileSync('./data/events.json'));
     for(eventEntry in events){
       if(events[eventEntry].path==path){
         updateEvent = events[eventEntry];
       }
     }
     updateEvent['title'] = title;
     updateEvent['members'] = memberList;
     updateEvent['description'] = description;
     updateEvent['type'] = type;
     updateEvent['date'] = date;
     updateEvent['organization'] = organization;
     updateEvent['path'] = path;
     events[path] = updateEvent;
     await fs.writeFileSync('./data/events.json', JSON.stringify(events));
     response.status(200);
     response.setHeader('Content-Type', 'text/html')
     response.redirect(`/event/${path}`);

  }else{
    response.status(400);
    response.setHeader('Content-Type', 'text/html')
    response.render("error", {
      "errorCode":"400"
    });
  }
});

router.get('/eventCreation', loggedIn, async function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    let groupObj = await Group.getAllGroups();
    let users = await User.getAllUsers();
    response.render("eventCreation",{
      user: request.user,
      users: users,
      groupsObj: groupObj
    }
  );
});

router.post('/eventCreation', loggedIn, function(request, response) {
    let title = request.body.title;
    let description = request.body.description;
    let date = request.body.date;
    let path = title.replace(/ /g, '-').toLowerCase();
    let organization = request.body.organization;
    let type = request.body.type;
    let memberList = request.body.memberList;
    let memberCount = memberList.length;
   if(0==0){
      let events = JSON.parse(fs.readFileSync('./data/events.json'));
      let newEvent = {
        "title": title,
        "path": path,
        "description": description,
        "organization": organization,
        "date": date,
        "type": type,
        "members": memberList,
        "memberCount": memberCount
      }
      events[path] = newEvent;
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
