require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let router = express.Router();
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const User = require("../models/owner");

router.post("/businessLogin", async(req, res) => {
    try {
        // Get user input
        const { Email, Password } = req.body;

        // Validate user input
        if (!(Email && Password)) {
            res.status(400).json({ msg: "All input is required" });
        }
        // Validate if user exist in our database
        const user = await User.findOne({ Email });
        if (user && (await bcrypt.compare(Password, user.Password))) {
            // Create token
            const token = jwt.sign({ user_id: user.Name, Email, ownerId: user.OwnerId },
                process.env.TOKEN_KEY, {
                    expiresIn: "12h",
                }
            );

            // save user token
            user.token = token;

            // user
            res.status(200).json(user);
        } else {
            res.status(400).json({ msg: "Invalid Credentials" });

        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;