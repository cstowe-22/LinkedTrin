const express = require('express'),
  router = express.Router();

const Group = require('../models/group_model');

router.get('/groupListings', function(request, response) {
    let groups = Group.getAllGroups();
    let groupArray = [];
    response.status(200);
    for(name in groups){
      groupArray.push(groups[name])
    }
    response.setHeader('Content-Type', 'text/html')
    response.render("groupListings", {
      groups: groupArray
    });
});

module.exports = router;
