
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const db = {};

db.mongoose = mongoose;

db.User = require('./user')(mongoose);
db.Thought = require('./thought')(mongoose);

module.exports = db;