const express = require('express');
const busignessreg = require('./routes/bussreg');
const busignesslogin = require('./routes/busslogin');
const userlogin = require('./routes/userlogin');
const userregister = require('./routes/usereg');
const cors = require('cors');
const bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var imageupload = require("./routes/imgupload");
var metadata = require("./routes/metadata");
var boatimage = require("./routes/boatimage");
var getowner = require("./routes/getowner");
var getuser = require("./routes/getuser");
var ownerboat = require("./routes/ownerboat");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require('dotenv').config();
const app = express();
const fs = require("fs");
const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');
const swaggerDocument = require('./swagger.json');
// const options = {
//     swaggerOptions: {
//         authAction: {
//             JWT: {
//                 name: 'JWT',
//                 schema: {
//                     type: 'apiKey',
//                     in: 'header',
//                     name: 'Authorization',
//                     description: ''
//                 },
//                 value: 'Bearer <my own JWT token>'
//             }
//         }
//     }
// };
// const specs = swaggerJsDoc(options);
// swaggerUI.setup(specs)

app.use(cors({
    origin: '*'
}));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument, { customCss }));


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(fileUpload());

app.use("/", userregister);
app.use("/", busignessreg);
app.use("/", busignesslogin);
app.use("/", userlogin);
app.use("/", imageupload);
app.use("/", metadata);
app.use("/", getowner);
app.use("/", getuser);
app.use("/", boatimage);
app.use("/", ownerboat);

var port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started listening on ${port}`)
});