const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String, required: true },
    Country: { type: String, required: true },
    Mobile: { type: String, required: true },
    Dob: { type: String, required: true },
    Gender: { type: String, required: true },
    Password: { type: String, required: true },
});

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;