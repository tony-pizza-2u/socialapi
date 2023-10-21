const {Schema} = require('mongoose');

const validator = require('validator');

module.exports = (mongoose) =>{

    const reactionSchema = new Schema({
        reactionBody: {type: String, required: true, min: 1, max: 280},
        username: {type: String, required: true},
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
            }
        },
    });

    return reactionSchema;
}