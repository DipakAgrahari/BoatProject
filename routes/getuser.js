require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let router = express.Router();
const auth = require("../middleware/auth");
var MongoClient = require('mongodb').MongoClient;
const { MONGO_URI } = process.env;
console.log(MONGO_URI)
router.get("/getalluser", auth, (req, res) => {
    try {
        MongoClient.connect(MONGO_URI, function(err, db) {
            if (err) throw err;
            var dbo = db.db("BoatProject");
            dbo.collection("users").find({}).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
                res.status(201).json(result);

            });
        });

    } catch (err) {
        console.log(err);
    }
});




router.get("/getuser", auth, (req, res) => {
    try {
        MongoClient.connect(MONGO_URI, function(err, db) {
            if (err) throw err;
            var dbo = db.db("BoatProject");
            dbo.collection("users").find({ Email: req.body.Email }).toArray(function(err, result) {
                if (err) throw err;
                console.log(result);
                db.close();
                res.status(201).json(result);

            });
        });

    } catch (err) {
        console.log(err);
    }
});
module.exports = router;