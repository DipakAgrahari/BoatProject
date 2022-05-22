const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    Country: { type: String, required: true },
    mobile: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    document: { type: String, required: true },
    password: { type: String, required: true },
});

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;