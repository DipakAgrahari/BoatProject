const express = require('express');
const boatRoute = require('./routes/boat');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Dipak:123456789aA@cluster0.u21cq.mongodb.net/BoatProject?retryWrites=true&w=majority').then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log("Error in DB Connnection")
    console.log(err)
})

app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/boatRoute', boatRoute);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started listening on ${port}`)
});