const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    OwnerId: { type: Number, required: true },
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
    IsApproved: { type: String, required: true },
    IsActive: { type: String, required: true },
    ApprovalOrLicenseIDUri: { type: String, required: true },
    ImageURL: { type: String, default: null },
    Boats: { type: String, default: null },
    password: { type: String, required: true }
});

const userModel = mongoose.model('Users', userSchema);
module.exports = userModel;