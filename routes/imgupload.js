var cloudinary = require('cloudinary');
const auth = require("../middleware/auth");
let express = require('express');
var path = require('path');
const fs = require('fs')
let router = express.Router();
const User = require("../models/owner");

cloudinary.config({
    cloud_name: 'bsai',
    api_key: '639263173263713',
    api_secret: '1_arhr8ZKFSJ2Prn_TDmVTIKEdE'
});

router.post('/uploadBoatImage', auth, async function(req, res) {
    console.log(req.files);
    var filename = req.files.picture;
    const Authdata = req.user
    console.log(filename);
    arr = [];

    if (!(filename.length)) {
        var filename = [];
        filename.push(req.files.picture)
    }
    for (i = 0; i < filename.length; i++) {
        if (filename[i].name.endsWith(".jpg") || filename[i].name.endsWith(".png") || filename[i].name.endsWith(".bmp") || filename[i].name.endsWith(".gif")) {
            imagename = filename[i].name.slice(0, -4);
        } else {
            if (filename[i].name.endsWith(".jpeg") || filename[i].name.endsWith(".html")) {
                imagename = filename[i].name.slice(0, -5);
            }
        }

        var newPath = process.cwd() + "/Images/" + filename[i].name;
        console.log(newPath);
        await cloudupload()
        async function cloudupload() {
            return new Promise(async(resolve, reject) => {
                await filename[i].mv(newPath, async function(err) {
                    if (err) {
                        console.log("Error Uploading File");
                        console.log(err);
                        reject()
                        res.send("Error Uploading File");
                    } else {
                        await cloudinary.uploader.upload(
                            newPath,
                            function(result) {
                                console.log(result);
                                console.log(result.url);
                                var ImageInfo = {
                                    "ImageName": filename[i].name,
                                    "ImageUrl": result.url,
                                };
                                arr.push(ImageInfo);
                                fs.unlinkSync(newPath);
                                resolve();
                            }, {
                                public_id: imagename,
                            });
                        resolve();
                    }
                });
            })
        }
        console.log(filename[i])
    }
    await imageurldb();

    async function imageurldb() {
        let imagearr = arr.map(a => a.ImageUrl);
        console.log(imagearr);

        var updatedBoat = {
            BoatID: 'fda01083-d673-4925-8a23-f1a5189e70aa',
            BoatName: 'ABC1',
            Type: 'ABC1',
            NoOfRooms: 2,
            NoOfBedrooms: 56,
            CostPerNight: 'RS 12354546',
            ImageURL: imagearr,
            Classification: 'ABC',
            Verified: true
        }

        User.findOne({ OwnerId: Authdata.ownerId }).then((result) => {
            var boatArray = result.Boats
            var filteredBoatArray = boatArray.filter(el => {
                return el.BoatID != updatedBoat.BoatID
            })

            filteredBoatArray = [...filteredBoatArray, updatedBoat]
            console.log(filteredBoatArray)

            var update = {
                $set: {
                    Boats: filteredBoatArray
                }
            }

            User.findOneAndUpdate({ OwnerId: Authdata.ownerId }, update).then((result) => {
                console.log(result)
                res.status(200).json({
                    message: "db updated",
                    status: "Success"
                })
            })
        })

    }
});

module.exports = router;