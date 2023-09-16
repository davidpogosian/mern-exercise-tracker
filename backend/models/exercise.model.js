const mongoose = require('mongoose');

// silly class rename
const Schema = mongoose.Schema;

// create exercise schema
const exerciseSchema = new Schema({
    username: { type: String, required: true},
    description: { type: String, required: true},
    duration: { type: Number, required: true},
    date: { type: Date, required: true}
}, {
    timestamps: true
});

// create model based on exercise schema
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;