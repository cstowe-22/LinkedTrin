const express = require('express'),
  router = express.Router();

const User = require('../models/user_model');

router.get('/eventListings', function(request, response) {
    let userArray = User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }
    response.setHeader('Content-Type', 'text/html')
    response.render("eventListings", {
      users: userArray
    });
});

router.get('/groupListings', function(request, response) {
    let users = User.getAllUsers();
    let userArray = [];
    response.status(200);
    for(id in users){
      userArray.push(users[id])
    }
    response.setHeader('Content-Type', 'text/html')
    response.render("groupListings", {
      users: userArray
    });
});

module.exports = router;
