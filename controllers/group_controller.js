const express = require('express'),
  router = express.Router();
  const app = express();

const Group = require('../models/group_model');
const User = require('../models/user_model');

router.get('/groupListings', function(request, response) {
    let groups = Group.getAllGroups();
    let groupObj = Group.getAllGroups();
    let groupArray = [];
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

router.get('/groupListings/'+':type', function(request, response) {
    let groups = Group.getAllGroups();
    let groupObj = Group.getAllGroups();
    let groupList = [];
    let typeSave = request.params.type;
    for(type in groups){
      if(groups[type].type==typeSave){
        groupList.push(groups[type]);
      }
    }
    let users = User.getAllUsers();
    let userObj = User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }
      response.setHeader('Content-Type', 'text/html')
      response.render("groupListings",{
        groups: groupList,
        groupsObj: groupObj,
        users: userObj
      });
});

router.get('/group/:path', function(request, response) {
    let groups = Group.getAllGroups();
    let groupObj = Group.getAllGroups();
    let selectedGroup = {};
    let path = request.params.path;
    for(groupEntry in groups){
      if(groups[groupEntry].path==path){
        selectedGroup = groups[groupEntry];
      }
    }
    let users = User.getAllUsers();
    let userObj = User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }
    // TODO: add logic after user is figured route
    let followed = 0;
      response.setHeader('Content-Type', 'text/html')
      response.render("group",{
        group: selectedGroup,
        users: userObj,
        followed: followed
      });
});

module.exports = router;
