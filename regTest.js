const mongoose = require('mongoose');

const BusinessModel= require('./models/owner')

mongoose.connect('mongodb+srv://Dipak:123456789aA@cluster0.u21cq.mongodb.net/BoatProject?retryWrites=true&w=majority');

const newBusiness= new BusinessModel({
    OwnerId:1234,
    Name:"ABC",
    PrimaryContactName: "ABC",
    PrimaryContactNumber: 1234567890,
    SecondaryContactName: "ABC",
    SecondaryContactNumber: 1212123434,
    Country: "ABC",
    State: "ABC",
    City: "ABC",
    Address: "ABC",
    PinCode: 1234,
    Longitude: "ABC",
    Latitude: "ABC",
    Landmark: "ABC",
    Rating: "ABC",
    Star: "ABC",
    IsApproved: "ABC",
    IsActive: "ABC",
    ApprovalOrLicenseIDUri: "ABC",
    ImageURL: "ABC",
    Boats: [],
    password: "ABC"
})

newBusiness.save().then((result)=>{
    console.log("data Saved")
    console.log(result)
})

