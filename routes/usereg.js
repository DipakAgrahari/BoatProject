require('dotenv').config({ debug: process.env.DEBUG })
let express = require('express');
let fs = require('fs');
let router = express.Router();

router.get('/test1', (req, res) => {
    res.send("test api v02 working");
});

router.post("/datafile", (req, res) => {

});
module.exports = router;