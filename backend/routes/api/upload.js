const express = require('express');
const { Spot, Review, SpotImage, User, ReviewImage, Booking } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { requireAuth } = require('../../utils/auth')

const router = express.Router();

//Add aws image to spot by spotId
router.post('/:id/aws', requireAuth, singleMulterUpload("image"), async (req, res) => {
    console.log("req file from multer: ", req)

    const spot = await Spot.findByPk(req.params.id);

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found"
        });
    };

    if (req.user.id !== spot.ownerId) {
        res.status(404);
        return res.json({
            "Error": "Spot must belong to current user"
        });
    };

    const file = req.file
    console.log("file: ", file)
    console.log("req: ", req.body)
    const url = await singlePublicFileUpload(file);
    console.log("url from singleUpload: ", url)

    const images = await SpotImage.findAll({
        where: {
            spotId: req.params.id
        }
    })

    let preview;
    if (!images.length) {
        preview = true
    } else {
        preview = false
    }

    const newImage = await spot.createSpotImage({
        url,
        preview
    });

    const response = {
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    }

    res.json(response)
});

module.exports = router;
