
const req = require('express/lib/request');
const mongoose = require('mongoose');
const BusinessModel = require('./models/owner')

mongoose.connect('mongodb+srv://Dipak:123456789aA@cluster0.u21cq.mongodb.net/BoatProject?retryWrites=true&w=majority');

var updatedBoat = {
    BoatID: "d3437988-8246-42de-bc18-8fe72e41c7bb",
    BoatName: "ABC1",
    Type: "ABC1",
    NoOfRooms: 2,
    NoOfBedrooms: 3,
    CostPerNight: "RS 123",
    ImageURL: "ABC",
    Classification: "ABC",
    Verified: true
}

BusinessModel.findOne({ OwnerId: 1003 }).then((result) => {  //Will work after code change by dipak
    var boatArray = result.Boats
    //console.log(boatArray)

    // var boatEleFound = boatArray.find(el => {
    //     return el.BoatID === updateBoat.BoatID
    // })

    var filteredBoatArray = boatArray.filter(el => {
        return el.BoatID != updatedBoat.BoatID
    })



    //boatEleFound = updateBoat


    // boatEleFound.BoatName = "ABC1"
    // boatEleFound.Type = "ABC1"
    // boatEleFound.NoOfRooms = 2
    // boatEleFound.NoOfBedrooms = 3
    // boatEleFound.CostPerNight = "rs 123"
    // boatEleFound.ImageURL = "ABC"

    filteredBoatArray = [...filteredBoatArray, updatedBoat]
    // boatArray = boatArray.map((ele) => {

    //     if (ele) {
    //         if (ele.BoatID == updateBoat.BoatID) {
    //             ele.BoatName = "ABC1"
    //             ele.Type = "ABC1"
    //             ele.NoOfRooms = 2
    //             ele.NoOfBedrooms = 3
    //             ele.CostPerNight = "rs 123"
    //             ele.ImageURL = "ABC"

    //             // console.log(ele)
    //         }
    //     }


    // })

    console.log(filteredBoatArray)

    var update = {
        $set: {
            Boats: filteredBoatArray
        }
    }

    BusinessModel.findOneAndUpdate({ OwnerId: 1003 }, update).then((result) => {
        console.log(result)
        // res.status(200).json({
        //     message: "db updated",
        //     status: "Success"
        // })
    })
})

