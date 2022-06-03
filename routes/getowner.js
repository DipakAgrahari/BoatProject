require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let router = express.Router();
const auth = require("../middleware/auth");
var MongoClient = require('mongodb').MongoClient;
const { MONGO_URI } = process.env;
console.log(MONGO_URI)
router.get("/getallowner", auth, (req, res) => {
    try {
        MongoClient.connect(MONGO_URI, function(err, db) {
            if (err) throw err;
            var dbo = db.db("BoatProject");
            dbo.collection("businesses").find({}).toArray(function(err, result) {
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




router.get("/getowner", auth, (req, res) => {
    try {
        MongoClient.connect(MONGO_URI, function(err, db) {
            if (err) throw err;
            var dbo = db.db("BoatProject");
            dbo.collection("businesses").find({ OwnerId: req.body.ownerId }).toArray(function(err, result) {
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