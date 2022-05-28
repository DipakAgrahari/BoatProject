var cloudinary = require('cloudinary');
const auth = require("../middleware/auth");
let express = require('express');
var path = require('path');
const fs = require('fs')
let router = express.Router();
// cloudinary.config({
//     cloud_name: 'schoolsyncmessage',
//     api_key: '229264686284394',
//     api_secret: 'jTzH3lh0_f4DYEYSotRRTaK2vyE'
// });
cloudinary.config({
    cloud_name: 'bsai',
    api_key: '639263173263713',
    api_secret: '1_arhr8ZKFSJ2Prn_TDmVTIKEdE'
});

router.post('/uploadBoatImage', auth, function(req, res) {
    console.log(req.files);
    var filename = req.files.picture.name;
    console.log(filename);
    if (filename.endsWith(".jpg") || filename.endsWith(".png") || filename.endsWith(".bmp") || filename.endsWith(".gif")) {
        filename = filename.slice(0, -4);
    } else {

        if (filename.endsWith(".jpeg") || filename.endsWith(".html")) {
            filename = filename.slice(0, -5);
        }
    }
    console.log(filename);
    var xlFile = req.files.picture;
    var newPath = process.cwd() + "/Images/" + req.files.picture.name;
    console.log(newPath);
    xlFile.mv(newPath, function(err) {
        if (err) {
            console.log("Error Uploading File");
            console.log(err);
            res.send("Error Uploading File");
        } else {
            cloudinary.uploader.upload(
                newPath,
                function(result) {
                    console.log(result);
                    console.log(result.url);
                    var ImageInfo = {
                        "ImageName": filename,
                        "ImageUrl": result.url,
                    };
                    res.json(ImageInfo);
                    fs.unlinkSync(newPath);
                }, {
                    public_id: filename,

                }
            );
        }
    });
});

module.exports = router;