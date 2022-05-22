require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let fs = require('fs');
let router = express.Router();
const ownerUser = require('../model/owner');
router.get('/test1', (req, res) => {
    res.send("test api v02 working");
});

router.post("/businessRegistration", (req, res) => {
    if (!(req.body.PrimaryContactName && req.body.Name && req.body.Address && req.body.password && req.body.PinCode)) {
        return res.status(400).json({ message: "Please provide required value" });
    };

    const userId = req.body.userId;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new ownerUser({
        OwnerId: req.body.OwnerId,
        Name: req.body.Name,
        PrimaryContactName: req.body.PrimaryContactName,
        PrimaryContactNumber: req.body.PrimaryContactNumber,
        SecondaryContactName: req.body.SecondaryContactName,
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
        ImageURL: req.body.ImageURL,
        Boats: req.body.Boats,
        password: req.bodypassword
    });

    user.save().then((data, err) => {

        if (err) {
            res.status(201).json({
                message: "Unable to create user"
            });
        };

        console.log("Registered user:", JSON.stringify(data, null, 2));
        const user = { // payload for jwt
            userId: userId
        };
        res.status(201).json({ accessToken: jwt.sign(user, process.env.JWT_SECRET_KEY) });
    });
});
module.exports = router;