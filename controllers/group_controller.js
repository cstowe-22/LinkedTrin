const express = require('express'),
  router = express.Router();
  const app = express();

const Group = require('../models/group_model');
const User = require('../models/user_model');

function loggedIn(request, response, next) {
  if (request.user) {
    next();
  } else {
    response.redirect('/login');
  }
}

router.get('/groupListings', loggedIn, async function(request, response) {
    let groups = await Group.getAllGroups();
    let groupObj = await Group.getAllGroups();
    let groupArray = [];
    for(name in groups){
      groupArray.push(groups[name])
    }
    let users = await User.getAllUsers();
    let userObj = await User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }

    response.setHeader('Content-Type', 'text/html')
    response.render("groupListings", {
      groups: groupArray,
      groupsObj: groupObj,
      users: userObj,
      userArray: userArray,
      user: request.user
    });
});

router.get('/groupListings/'+':type', loggedIn, async function(request, response) {
    let groups = await Group.getAllGroups();
    let groupObj = await Group.getAllGroups();
    let groupList = [];
    let typeSave = request.params.type;
    for(type in groups){
      if(groups[type].type==typeSave){
        groupList.push(groups[type]);
      }
    }
    let users = await User.getAllUsers();
    let userObj = await User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }
      response.setHeader('Content-Type', 'text/html')
      response.render("groupListings",{
        groups: groupList,
        groupsObj: groupObj,
        users: userObj,
        user: request.user
      });
});

router.get('/group/:path', loggedIn, async function(request, response) {
    let groups = await Group.getAllGroups();
    let groupObj = await Group.getAllGroups();
    let userId = await User.getId(request.user._json.email);
    let selectedGroup = {};
    let isLeader = false;
    let path = request.params.path;
    for(groupEntry in groups){
      if(groups[groupEntry].path==path){
        selectedGroup = groups[groupEntry];
        isLeader = await Group.isLeader(userId, selectedGroup.path);
      }
    }
    let users = await User.getAllUsers();
    let userObj = await User.getAllUsers();
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
        userArray: userArray,
        followed: followed,
        user: request.user,
        isLeader: isLeader
      });
});

router.get('/groupCreation', loggedIn, async function(request, response) {
    response.status(200);
    response.setHeader('Content-Type', 'text/html');
    let users = await User.getAllUsers();
    response.render("groupCreation",{
      user: request.user,
      users: users
    }
  );
});

module.exports = router;
