const uuid = require('uuid');
const fs = require('fs');


exports.getAllGroups =  async function() {
  let allGroups = await JSON.parse(fs.readFileSync(__dirname+'/../data/groups.json'));
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

exports.isLeader = async function(userID, gPath) {
  let allGroups = await JSON.parse(fs.readFileSync(__dirname+'/../data/groups.json'));
  let group = allGroups[gPath];
  let result = false;
  // console.log(group);
  if(group.advisor == userID) {
    result = true;
    // console.log("Found advisor");
  } else {
    group.leaders.forEach((leaderID) => {
      // console.log(leaderID);
      if(leaderID == userID) {
        result = true;
        // console.log("Found leader");
      }
    });
  }
  // console.log("Not A leader");
  return result;
}
