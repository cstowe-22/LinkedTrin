const express = require('express'),
  router = express.Router();

const Event = require('../models/event_model');

router.get('/eventListings', function(request, response) {
    let events = Event.getAllEvents();
    let eventList = Array.from(events);
    console.log(eventList[0]);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("eventListings", {
      eventList: eventList
    });
});

module.exports = router;
