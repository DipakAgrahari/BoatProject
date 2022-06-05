require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let fs = require('fs');
let router = express.Router();
const bcrypt = require("bcrypt")
const User = require('../models/user');

router.post("/userreg", async(req, res) => {
    try {
        if (!(req.body.Name && req.body.Email && req.body.Mobile && req.body.Password && req.body.Gender)) {
            return res.status(400).json({ message: "Please provide required value" });
        };

        const hashedPassword = await bcrypt.hash(req.body.Password, 10);
        const oldUser = await User.findOne({ Email: req.body.Email });
        const phoneUser = await User.findOne({ Mobile: req.body.Mobile });
        if (oldUser) {
            return res.status(409).json({ msg: "User Already Exist. Please Login" });
        }
        if (phoneUser) {
            return res.status(409).json({ msg: "Phone number is already taken" });
        }
        if (req.body.Password != req.body.ConfirmPassword) {
            res.status(400).json({ msg: "password and conirm_password not matched" });
        }
        const user = new User({
            Email: req.body.Email,
            Name: req.body.Name,
            Country: req.body.Country,
            Mobile: req.body.Mobile,
            Dob: req.body.Dob,
            Gender: req.body.Gender,
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