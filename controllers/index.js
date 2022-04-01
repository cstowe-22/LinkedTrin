const express = require('express'),
router = express.Router();
const app = express();
const fs = require('fs');
const Group = require('../models/group_model');
const Event = require('../models/event_model');


router.get('/', async function(request, response) {
  let events = await Event.getAllEvents();
  let eventObj = await Event.getAllEvents();
  let groups = await Group.getAllGroups();
  let groupObj = await Group.getAllGroups();
  let eventList = [];
  let attendees = [];
  let groupList = [];
  let members = [];
  let memberSort = [];
  for(i in events){
    attendees.push(events[i].members.length);
  }
  console.log(attendees);
  let length = attendees.length;
  let num;
  let index=0;
  for (a=0; a<length;a++){
    for (h=0; h<length;h++){
      if(attendees[a]<attendees[h+a]){
        num = attendees[h+a];
        attendees.splice(h+a,1);
        for(e=0; e<length;e++){
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
    for(i in attendees.length){
      console.log(attendees[i]);
      eventList.push(events[attendees[i]]);
    }
  }
  console.log(attendees);
  response.status(200);
  response.setHeader('Content-Type', 'text/html')
  response.render("index", {
    user: request.user,
    events: eventList,
    groups: groupList
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
