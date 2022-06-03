require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let router = express.Router();
const auth = require("../middleware/auth");
const User = require('../models/owner');


router.get("/allboatimage", auth, (req, res) => {
    try {
        arr = [];
        User.findOne({}, { Boats: 1 }).then((result) => {
            result._doc.Boats.forEach(element => {
                console.log(element.ImageURL)
                arr.push(element.ImageURL)
            });
            res.status(201).json(arr);

        })
    } catch (err) {
        console.log(err);
    }
});

router.get("/ownerboatimage", auth, (req, res) => {
    try {
        const { ownerId } = req.body;
        User.findOne({ OwnerId: ownerId }).then((result) => { //Will work after code change by dipak
            var boatArray = result.Boats
            console.log(result.Boats)
            console.log(boatArray)
            var filteredBoatArray = boatArray.filter(el => {
                return el.BoatID === req.body.BoatID
            })
            res.status(201).json(filteredBoatArray[0].ImageURL);

        })
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;