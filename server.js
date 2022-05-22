const express = require('express');
const userreg = require('./routes/userreg');
const busignessreg = require('./routes/bussreg');
const busignesslogin = require('./routes/busslogin');
const userlogin = require('./routes/userlogin');

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/userRegestration', userreg);
app.use('/businessRegestrtion', busignessreg);
app.use('/businessRegestrtion', busignesslogin);
app.use('/businessRegestrtion', userlogin);


var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started listening on ${port}`)
});