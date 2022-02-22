const uuid = require('uuid');
const fs = require('fs');


exports.getAllUsers =  function() {
  let allUsers = JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  return allUsers;
}
