const validator = require('validator');

module.exports = (mongoose) =>{

    const {Schema} = mongoose;

    const reactionSchema = new Schema({
        reactionId: {type: Schema.ObjectId, required: true},
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

    const thoughtSchema = new Schema({
        thoughtText: {type: String, required: true, min: 1, max: 280},
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T") [0];
            }
        },
        username: {type: String, required: true},
        reactions: [reactionSchema]
    });

    const Thought = mongoose.model('Thought', thoughtSchema);

    return Thought;
}