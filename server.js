const express = require('express');
const busignessreg = require('./routes/bussreg');
const busignesslogin = require('./routes/busslogin');
const userlogin = require('./routes/userlogin');
const userregister = require('./routes/usereg')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/", userregister);
app.use("/", busignessreg);
app.use("/", busignesslogin);
app.use("/", userlogin);


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started listening on ${port}`)
});