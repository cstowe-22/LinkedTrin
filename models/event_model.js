const uuid = require('uuid');
const fs = require('fs');


exports.getAllEvents =  async function() {
  let allEvents = await JSON.parse(fs.readFileSync(__dirname+'/../data/events.json'));
  return allEvents;
}

exports.emailToID = function(email, userObj){
  console.log(userObj);
  for (const id in userObj) {
    if(userObj[id].email == email) {
      return id;
    }
  }
  return false;
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
