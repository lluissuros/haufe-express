const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./src/data/db.json');
const database = low(adapter);

// Set some defaults if your JSON file is empty
database.defaults({ })
  .write();

 module.exports = database;
