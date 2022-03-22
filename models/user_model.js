const uuid = require('uuid');
const fs = require('fs');


exports.getAllUsers =  async function() {
  let allUsers = await JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  return allUsers;
}

exports.getId = async function(email) {
  let allUsers = await JSON.parse(fs.readFileSync(__dirname+'/../data/users.json'));
  for (const id in allUsers) {
    if(allUsers[id].email == email) {
      return id;
    }
  }
  return false;
}
