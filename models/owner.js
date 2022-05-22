const mongoose = require('mongoose');
var connection = mongoose.createConnection(process.env.MONGO_URI);
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);
const userSchema = mongoose.Schema({
    Email: { type: String, required: true },
    Name: { type: String, required: true },
    PrimaryContactName: { type: String, required: true },
    PrimaryContactNumber: { type: Number, required: true },
    SecondaryContactName: { type: String, default: null },
    SecondaryContactNumber: { type: Number, default: null },
    Country: { type: String, required: true },
    State: { type: String, required: true },
    City: { type: String, required: true },
    Address: { type: String, required: true },
    PinCode: { type: Number, required: true },
    Longitude: { type: String, default: null },
    Latitude: { type: String, default: null },
    Landmark: { type: String, required: true },
    Rating: { type: String, default: null },
    Star: { type: String, required: true },
    token: { type: String },
    IsApproved: { type: String, required: true },
    IsActive: { type: String, required: true },
    ApprovalOrLicenseIDUri: { type: String, required: true },
    ImageURL: { type: Boolean, default: null },
    Boats: { type: Array, default: null },
    Password: { type: String, required: true }
});
userSchema.plugin(autoIncrement.plugin, {
    model: 'businesses',
    field: 'OwnerId',
    startAt: 1000,
    incrementBy: 1
});
const userModel = mongoose.model('businesses', userSchema);
module.exports = userModel;