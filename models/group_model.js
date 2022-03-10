const uuid = require('uuid');
const fs = require('fs');


exports.getAllGroups =  function() {
  let allGroups = JSON.parse(fs.readFileSync(__dirname+'/../data/groups.json'));
  return allGroups;
}

/* Check to see if a user is part of a group*/
exports.memberLookup = function(searchEntry, groupObj) {
  for(let i = 0; i<groupObj.members.length;i++) {
    if (searchEntry == groupObj.members[i]) {
      return true;
    }
  }
  return false;
}

exports.isLeader = function(searchEntry, groupObj) {
  for(let i = 0; i<groupObj.leaders.length;i++) {
    if (searchEntry == groupObj.leaders[i] || searchEntry == groupObj.advisor) {
      return true;
    }
  }
  return false;
}
