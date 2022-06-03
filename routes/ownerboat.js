require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let router = express.Router();
const auth = require("../middleware/auth");
const User = require('../models/owner');

router.get("/ownerallboat", auth, (req, res) => {
    try {
        const { ownerId } = req.body;
        User.findOne({ OwnerId: ownerId }).then((result) => { //Will work after code change by dipak
            var boatArray = result.Boats
            console.log(result.Boats)
            console.log(boatArray)
            res.status(201).json(boatArray);

        })
    } catch (err) {
        console.log(err);
    }
});
router.get("/ownerboat", auth, (req, res) => {
    try {
        const { ownerId } = req.body;
        User.findOne({ OwnerId: ownerId }).then((result) => {
            var boatArray = result.Boats
            console.log(result.Boats)
            console.log(boatArray)
            var filteredBoatArray = boatArray.filter(el => {
                return el.BoatID === req.body.BoatID
            })
            res.status(201).json(filteredBoatArray);

        })
    } catch (err) {
        console.log(err);
    }
});
router.get("/allboatfromowner", auth, (req, res) => {
    try {
        User.findOne({}, { Boats: 1 }).then((result) => {
            res.status(201).json(result);

        })
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;