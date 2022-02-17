const express = require('express'),
  router = express.Router();

const Event = require('../models/event_model');

router.get('/eventListings', function(request, response) {
    let events = Event.getAllEvents();
    console.log(events);
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("eventListings", {
      events: events
    });
});

module.exports = router;
