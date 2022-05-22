
const mongoose = require('mongoose');
const BusinessModel = require('./models/owner')

mongoose.connect('mongodb+srv://Dipak:123456789aA@cluster0.u21cq.mongodb.net/BoatProject?retryWrites=true&w=majority');

var newBoat = {
    BoatID: 555,
    BoatName:"ABC",
    Type:"ABC",
    NoOfRooms:2,
    NoOfBedrooms:2,
    CostPerNight:"Rs 2000",
    ImageURL:"ABC/ABC/ABC",
    Classification:"ABC",
    Verified:true
}

BusinessModel.findOne({ OwnerId: 111 }).then((result) => {
    var boatArray = result.Boats
    boatArray = [...boatArray, newBoat]
    console.log(boatArray)

    var filter={
        
    }
    var update = {
        $set: {
            Boats: boatArray
        }
    }

    BusinessModel.findOneAndUpdate({ OwnerId: 111 }, update).then((result) => {
        console.log(result)
    })
})

