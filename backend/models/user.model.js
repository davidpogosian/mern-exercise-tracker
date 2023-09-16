const mongoose = require('mongoose');

// rename class
const Schema = mongoose.Schema;

// create user Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // trim whitespace
        minlength: 3
    },  
}, {
    timestamps: true, // when it was created & modified
});

const User = mongoose.model('User', userSchema);
//                          ^ made-up name for this model
module.exports = User;