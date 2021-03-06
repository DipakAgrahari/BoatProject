require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let router = express.Router();
require("../config/database").connect();
const bcrypt = require("bcrypt")

const ownerUser = require('../models/owner');

router.post("/businessRegistration", async(req, res) => {
    try {
        if (!(req.body.PrimaryName && req.body.Name && req.body.Address && req.body.Password && req.body.PinCode)) {
            return res.status(400).json({ message: "Please provide required value" });
        };

        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        const oldUser = await ownerUser.findOne({ Email: req.body.Email });
        const phoneUser = await ownerUser.findOne({ PrimaryContactNumber: req.body.PrimaryContactNumber });
        if (oldUser) {
            return res.status(409).json({ msg: "User Already Exist. Please Login" });
        }
        if (phoneUser) {
            return res.status(409).json({ msg: "Phone number is already taken" });
        }
        if (req.body.Password != req.body.ConfirmPassword) {
            res.status(400).json({ msg: "password and conirm_password not matched" });
        }
        const user = new ownerUser({
            OwnerId: req.body.Email + "_" + req.body.PrimaryContactNumber,
            Email: req.body.Email,
            Name: req.body.Name,
            PrimaryName: req.body.PrimaryName,
            PrimaryContactNumber: req.body.PrimaryContactNumber,
            SecondaryName: req.body.SecondaryName,
            SecondaryContactNumber: req.body.SecondaryContactNumber,
            Country: req.body.Country,
            State: req.body.State,
            City: req.body.City,
            Address: req.body.Address,
            PinCode: req.body.PinCode,
            Longitude: req.body.Longitude,
            Latitude: req.body.Latitude,
            Landmark: req.body.Landmark,
            Rating: req.body.Rating,
            Star: req.body.Star,
            IsApproved: req.body.IsApproved,
            IsActive: req.body.IsActive,
            ApprovalOrLicenseIDUri: req.body.ApprovalOrLicenseIDUri,
            Boats: [],
            Password: hashedPassword
        });

        user.save().then((data, err) => {

            if (err) {
                res.status(201).json({
                    message: "Unable to create user"
                });
            };

            console.log("Registered user:", JSON.stringify(data, null, 2));
        });
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;