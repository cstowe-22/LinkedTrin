const express = require('express'),
router = express.Router();
const app = express();
const fs = require('fs');
const Group = require('../models/group_model');
const Event = require('../models/event_model');
const User = require('../models/user_model');


router.get('/', async function(request, response) {
  let events = await Event.getAllEvents();
  let eventObj = await Event.getAllEvents();
  let groups = await Group.getAllGroups();
  let groupObj = await Group.getAllGroups();
  let userObj = await User.getAllUsers();
  let eventArray = [];
  let eventList = [];
  let attendees = [];
  let groupArray = [];
  let groupList = [];
  let members = [];
  for(i in events){
    attendees.push(events[i].members.length);
    eventArray.push(events[i]);
  }
  for(g in groups){
    members.push(groups[g].members.length);
    groupArray.push(groups[g]);
  }
  let eventLength = attendees.length;
  let groupLength = members.length;
  let num;
  let index=0;
  for (a=0; a<eventLength;a++){
    for (h=0; h<eventLength;h++){
      if(attendees[a]<attendees[h+a]){
        num = attendees[h+a];
        attendees.splice(h+a,1);
        for(e=0; e<eventLength;e++){
          if(attendees[e]>num){
            index+=1;
          }
          else{
            break;
          }
        }
        attendees.splice(index,0,num);
      }
    }
  }
  console.log(attendees);
  index=0;
  for (a=0; a<groupLength;a++){
    for (h=0; h<groupLength;h++){
      if(members[a]<members[h+a]){
        num = members[h+a];
        members.splice(h+a,1);
        for(e=0; e<groupLength;e++){
          if(members[e]>num){
            index+=1;
          }
          else{
            break;
          }
        }
        members.splice(index,0,num);
      }
    }
  }
  console.log(members);
    for(z=0;z<eventLength;z++){
      for(b=0;b<eventLength;b++){
        if(eventArray[b].members.length==attendees[z]){
          eventList.push(eventArray[b]);
        }
      }
    }
    for(z=0;z<groupLength;z++){
      for(b=0;b<groupLength;b++){
        if(groupArray[b].members.length==members[z]){
          groupList.push(groupArray[b]);
        }
      }
    }
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
    user: request.user,
    events: eventList,
    groups: groupList,
    users: userObj
  })
});

router.get('/error', function(request, response) {
  const errorCode = request.query.code;
  if (!errorCode) errorCode = 400;
  const errors = {
    '400': "Unknown Client Error",
    '401': "Invlaid Login",
    '404': "Resource Not Found",
    '500': "Server problem"
  }

  response.status(errorCode);
  response.setHeader('Content-Type', 'text/html')
  response.render("error", {
    user: request.user,
    "errorCode": errorCode,
    "details": errors[errorCode]
  });
});

module.exports = router
