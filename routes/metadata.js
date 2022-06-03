const { randomUUID } = require('crypto'); // Added in: node v14.17.0
require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let router = express.Router();
const User = require("../models/owner");
const auth = require("../middleware/auth");

router.post("/addmetadata", auth, (req, res) => {
    const Authdata = req.user
    var newBoat = {
        BoatID: randomUUID().toString(),
        BoatName: req.body.BoatName,
        Type: req.body.Type,
        NoOfRooms: req.body.NoOfRooms,
        NoOfBedrooms: req.body.NoOfBedrooms,
        CostPerNight: req.body.CostPerNight,
        ImageURL: req.body.ImageURL,
        Classification: req.body.Classification,
        Verified: true
    }

    User.findOne({ OwnerId: Authdata.ownerId }).then((result) => { //Will work after code change by dipak
        var boatArray = result.Boats
        boatArray = [...boatArray, newBoat]
        console.log(boatArray)

        var update = {
            $set: {
                Boats: boatArray
            }
        }

        User.findOneAndUpdate({ OwnerId: Authdata.ownerId }, update).then((result) => {
            console.log(result)
            res.status(200).json({
                message: "db updated",
                status: "Success"
            })
        })
    })
});


router.post("/updatemetadata", auth, (req, res) => {
    const Authdata = req.user
    var updatedBoat = {
        BoatID: req.body.BoatID,
        BoatName: req.body.BoatName,
        Type: req.body.Type,
        NoOfRooms: req.body.NoOfRooms,
        NoOfBedrooms: req.body.NoOfBedrooms,
        CostPerNight: req.body.CostPerNight,
        ImageURL: req.body.ImageURL,
        Classification: req.body.Classification,
        Verified: true
    }

    User.findOne({ OwnerId: Authdata.ownerId }).then((result) => {
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

        User.findOneAndUpdate({ OwnerId: Authdata.ownerId }, update).then((result) => {
            console.log(result)
            res.status(200).json({
                message: "db updated",
                status: "Success"
            })
        })
    })
});
module.exports = router;