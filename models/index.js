
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const db = {};

db.mongoose = mongoose;

db.User = require('./user.js')(mongoose);
db.Thought = require('./thought.js')(mongoose);

module.exports = db;