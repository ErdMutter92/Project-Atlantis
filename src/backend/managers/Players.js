var axios = require('axios');
var fs = require('fs');
var DatabaseManager = require('./database');
var StargateDB = DatabaseManager.getManager();

module.exports = {
  parseUUID: function (uuid) {
    var playerID = []
    playerID.push(uuid.substring(0, 8));
    playerID.push(uuid.substring(8, 12));
    playerID.push(uuid.substring(12, 16));
    playerID.push(uuid.substring(16, 20));
    playerID.push(uuid.substring(20, uuid.length));
    return playerID.join('-');
  },
  readJson: function (uri) {
    return JSON.parse(fs.readFileSync(uri, 'utf8'));
  }
};
