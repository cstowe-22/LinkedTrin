const uuid = require('uuid');
const fs = require('fs');


exports.getAllEvents =  function() {
  let allEvents = JSON.parse(fs.readFileSync(__dirname+'/../data/events.json'));
  return allEvents;
}

exports.attendeeLookup = function(searchEntry, eventObj) {
  for(let i = 0; i<eventObj.attendees.length;i++) {
    if (searchEntry == eventObj.attendees[i]) {
      return true;
    }
  }
  return false;
}

//Make it so that only organizations can create events
/*
exports.isLeader = function(searchEntry, groupObj) {
  for(let i = 0; i<groupObj.leaders.length;i++) {
    if (searchEntry == groupObj.leaders[i] || searchEntry == groupObj.advisor) {
      return true;
    }
  }
  return false;
}*/
