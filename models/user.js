const validator = require('validator');

module.exports = (mongoose) =>{

    const {Schema} = mongoose;

    const userSchema = new Schema({
        username: {type: String, required: true, unique: true, trim: true},
        email: {type: String, required: true, unique: true, validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
          }
        },
        friends: [{ type : mongoose.Types.ObjectId, ref: 'User' }],
        thoughts: [{ type : mongoose.Types.ObjectId, ref: 'Thought' }]
    });

    userSchema.virtual('friendCount').get(function() {
        return this.friends.length;
    });

    const User = mongoose.model('User', userSchema);

    return User;
}