const express = require('express'),
  router = express.Router();
  const app = express();
    const fs = require('fs');

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
    console.log("My group: ");
    console.log(selectedGroup);
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
router.post('/groupCreation', loggedIn, async function(request, response) {
    let groupName = request.body.groupName;
    let path = groupName.replace(' ', '-').toLowerCase();
    let leaderList = request.body.leaderList;
    let advisor = request.body.advisor;
    let description = request.body.description;
    let type = request.body.type;
    let memberList = request.body.memberList;

    console.log("My Grroup: ");
    console.log(request.body);
   if(0==0){
      let groups = await JSON.parse(fs.readFileSync('./data/groups.json'));
      let newGroup = {
        "name": groupName,
        "path": path,
        "leaders": leaderList,
        "advisor": advisor,
        "description": description,
        "type": type,
        "members": memberList
      }
      groups[path] = newGroup;
      await fs.writeFileSync('./data/groups.json', JSON.stringify(groups));
      response.status(200);
      response.setHeader('Content-Type', 'text/html')
      response.redirect("/groupListings");

   }else{
     response.status(400);
     response.setHeader('Content-Type', 'text/html')
     response.render("error", {
       "errorCode":"400"
     });
   }
});

module.exports = router;
