const express = require('express'),
  router = express.Router();
  const app = express();

const Group = require('../models/group_model');
const User = require('../models/user_model');

router.get('/groupListings', function(request, response) {
    let groups = Group.getAllGroups();
    let groupObj = Group.getAllGroups();
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
      groupsObj: groupObj,
      users: userObj
    });
});

router.get('/groupListings/:type', function(request, response) {
    let groups = Group.getAllGroups();
    let groupList = [];
    let groupsObj = Group.getAllGroups();
    let typeSave = request.params.type;
    for(type in groups){
      if(groups[type].type==typeSave){
        groupList.push(groups[type]);
      }
    }
    let users = User.getAllUsers();
    let userObj = User.getAllUsers();
    let userArray = [];
    for(id in users){
      userArray.push(users[id])
    }
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.render("groupSort",{
        groupFilter: groupList,
        groupsObj: groupObj,
        users: userObj
      });
});

module.exports = router;
