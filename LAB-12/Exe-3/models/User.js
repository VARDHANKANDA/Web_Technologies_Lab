const mongoose = require('mongoose');

// Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    email: {
        type: String,
        required: true
    }
});

// Model
module.exports = mongoose.model('User', userSchema);