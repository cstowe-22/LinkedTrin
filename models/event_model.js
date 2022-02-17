const uuid = require('uuid');
const fs = require('fs');


exports.getAllEvents =  function() {
  let allEvents = JSON.parse(fs.readFileSync(__dirname+'/../data/events.json'));
  return allEvents;
}
