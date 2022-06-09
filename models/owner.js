const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    OwnerId: { type: String, required: true },
    Email: { type: String, required: true },
    Name: { type: String, required: true },
    PrimaryName: { type: String, required: true },
    PrimaryContactNumber: { type: Number, required: true },
    SecondaryName: { type: String, default: null },
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
    Boats: [{
        BoatID: { type: String, required: true },
        BoatName: { type: String, required: true },
        Type: { type: String, required: true },
        NoOfRooms: { type: Number, required: true },
        NoOfBedrooms: { type: Number, required: true },
        CostPerNight: { type: String, required: true },
        ImageURL: { type: Array, required: true },
        Classification: { type: String, required: true },
        Verified: { type: Boolean, required: true }

    }],
    Password: { type: String, required: true }
});

const userModel = mongoose.model('businesses', userSchema);
module.exports = userModel;