const express = require('express'),
  router = express.Router();

const Group = require('../models/group_model');
const User = require('../models/user_model');

router.get('/groupListings', function(request, response) {
    let groups = Group.getAllGroups();
    let groupArray = [];
    response.status(200);
    for(name in groups){
      groupArray.push(groups[name])
    }

    let users = User.getAllUsers();
    let userObj = User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }

    response.setHeader('Content-Type', 'text/html')
    response.render("groupListings", {
      groups: groupArray,
      users: userObj
    });
});

router.get('/groupListings/:type', function(request, response) {
    let groups = Group.getAllGroups();
    response.status(200);
    let groupType = request.params.type;

    if(groups[type]){
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("groupSort",{
        groupFilter: groups[type]
      });
});

module.exports = router;
