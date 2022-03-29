const express = require('express'),
  router = express.Router();
  const app = express();
const fs = require('fs');

const Event = require('../models/event_model');
const User = require('../models/user_model');

const {google} = require("googleapis");
const calendar = google.calendar("v3");

var users = fs.readFileSync("../data/users.json");
var events = fs.readFileSync("../data/events.json");

//this is the function that should be called when a button is clicked, which adds that event to the user's main calendar
var event = {
  'summary': (),//event name
  'location': 'Trinity School',
  'description': ()//event description,
  'start': {
    'dateTime': '2015-05-28T09:00:00-07:00',
    'timeZone': 'America/New_York',
  },
  'end': {
    'dateTime': '2015-05-28T17:00:00-07:00',
    'timeZone': 'America/New_York',
  },
  'recurrence': [
    'RRULE:FREQ=DAILY;COUNT=2'//Will figure out how to set this ot not recur at all
  ],
  'attendees': [
    {'email': 'lpage@example.com'},//use user json file to include these
    {'email': 'sbrin@example.com'},
  ],
  'reminders': {
    'useDefault': false,
    'overrides': [
      {'method': 'email', 'minutes': 24 * 60},
      {'method': 'popup', 'minutes': 10},
    ],
  },
};

//I've left this here to illustrate what an event should look like.
//Once we've made it such that our events can be read as cal events, all that is required is to call the function below to add the event to the cal.

calendar.events.insert({
  auth: auth,
  calendarId: 'primary',
  resource: event,
}, function(err, event) {
  if (err) {
    console.log('There was an error contacting the Calendar service: ' + err);
    return;
  }
  console.log('Event created: %s', event.htmlLink);
});
