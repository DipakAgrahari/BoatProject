
const mongoose = require('mongoose');
const BusinessModel = require('./models/owner')
const { randomUUID } = require('crypto'); // Added in: node v14.17.0

mongoose.connect('mongodb+srv://Dipak:123456789aA@cluster0.u21cq.mongodb.net/BoatProject?retryWrites=true&w=majority');

var newBoat = {
    BoatID:randomUUID().toString(),
    BoatName:"ABC1",
    Type:"ABC1",
    NoOfRooms:2,
    NoOfBedrooms:3,
    CostPerNight:"RS 123",
    ImageURL:"ABC",
    Classification:"ABC",
    Verified:true
}

BusinessModel.findOne({ OwnerId: 1234 }).then((result) => {  //Will work after code change by dipak
    var boatArray = result.Boats
    boatArray = [...boatArray, newBoat]
    console.log(boatArray)

    var update = {
        $set: {
            Boats: boatArray
        }
    }

    BusinessModel.findOneAndUpdate({ OwnerId: 1234 }, update).then((result) => {
        console.log(result)
        // res.status(200).json({
        //     message: "db updated",
        //     status: "Success"
        // })
    })
})

