const { randomUUID } = require('crypto'); // Added in: node v14.17.0
require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let router = express.Router();
const User = require("../models/owner");

router.post("/addmetadata", (req, res) => {

    var newBoat = {
        BoatID: randomUUID().toString(),
        BoatName: "ABC1",
        Type: "ABC1",
        NoOfRooms: 2,
        NoOfBedrooms: 5,
        CostPerNight: "RS 12356",
        ImageURL: "ABC",
        Classification: "ABC",
        Verified: true
    }

    User.findOne({ OwnerId: 1003 }).then((result) => { //Will work after code change by dipak
        var boatArray = result.Boats
        boatArray = [...boatArray, newBoat]
        console.log(boatArray)

        var update = {
            $set: {
                Boats: boatArray
            }
        }

        User.findOneAndUpdate({ OwnerId: 1003 }, update).then((result) => {
            console.log(result)
            res.status(200).json({
                message: "db updated",
                status: "Success"
            })
        })
    })
});


router.post("/updatemetadata", (req, res) => {

    var updatedBoat = {
        BoatID: "dc8ca9cc-e129-4afc-ba34-06037be16ea9",
        BoatName: "ABC1",
        Type: "ABC1",
        NoOfRooms: 2,
        NoOfBedrooms: 3,
        CostPerNight: "RS 123554845",
        ImageURL: "ABC",
        Classification: "ABC",
        Verified: true
    }

    User.findOne({ OwnerId: 1003 }).then((result) => { //Will work after code change by dipak
        var boatArray = result.Boats
        var filteredBoatArray = boatArray.filter(el => {
            return el.BoatID != updatedBoat.BoatID
        })

        filteredBoatArray = [...filteredBoatArray, updatedBoat]
        console.log(filteredBoatArray)

        var update = {
            $set: {
                Boats: filteredBoatArray
            }
        }

        User.findOneAndUpdate({ OwnerId: 1003 }, update).then((result) => {
            console.log(result)
            res.status(200).json({
                message: "db updated",
                status: "Success"
            })
        })
    })
});
module.exports = router;