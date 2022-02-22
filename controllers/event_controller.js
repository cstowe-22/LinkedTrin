const express = require('express'),
  router = express.Router();

const Event = require('../models/event_model');

router.get('/eventListings', function(request, response) {
    let events = Event.getAllEvents();
    let eventArray = [];
    response.status(200);
    for(title in events){
      eventArray.push(events[title])
    }
    response.setHeader('Content-Type', 'text/html')
    response.render("eventListings", {
      events: eventArray
    });
});

module.exports = router;
