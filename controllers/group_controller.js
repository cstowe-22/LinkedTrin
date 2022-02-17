const express = require('express'),
  router = express.Router();

const Group = require('../models/group_model');

router.get('/groupListings', function(request, response) {
    let events = Group.getAllGroups();
    response.status(200);
    response.setHeader('Content-Type', 'text/html')
    response.render("groupListings", {
      data: groups
    });
});

module.exports = router;
