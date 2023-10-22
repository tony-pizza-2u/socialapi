
require('dotenv').config();

const mongoose = require('mongoose');

const db = {};

try{

    mongoose.connect(process.env.DB_URL);

    db.mongoose = mongoose;
    
    db.User = require('./user')(mongoose);
    db.Thought = require('./thought')(mongoose);

}catch(error){
    console.log('DB connection failed');
}



module.exports = db;