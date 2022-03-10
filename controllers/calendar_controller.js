const express = require('express'),
  router = express.Router();
  const app = express();

const Event = require('../models/event_model');
const User = require('../models/user_model');

const {google} = require("googleapis");
const calendar = google.calendar("v3");

const res = await calendar.calendars.clear({
  calendarId: "placeholder-value",
});

console.log(res.data);
