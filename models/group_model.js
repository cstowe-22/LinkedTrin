const uuid = require('uuid');
const fs = require('fs');


exports.getAllGroups =  function() {
  let allGroups = JSON.parse(fs.readFileSync(__dirname+'/../data/groups.json'));
  return allGroups;
}
