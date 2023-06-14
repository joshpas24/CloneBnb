const express = require('express');
const { Op, sequelize } = require('sequelize');
const { Spot, Review, ReviewImage, SpotImage, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();

//Get all reviews by current user
router.get('/current', requireAuth, async(req,res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        }
    });

    const newReviews = []

    for (let review of reviews) {
        const newReview = review.toJSON();

        //User attribute query
        const user = await User.findOne({
            where: {
                id: review.userId
            },
            attributes: ['id', 'firstName', 'lastName']
        });

        //Spot attribute query
        const spot = await Spot.findOne({
            where: {
                id: review.spotId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        //previewimage query in Spot attribute
        const prevImg = await SpotImage.findOne({
            where: {
                spotId: spot.id,
            },
        });
        let imageVal;
        if (!prevImg) {
            imageVal = null;
        } else {
            imageVal = prevImg.dataValues.url;
        };

        const newSpot = spot.toJSON();
        newSpot.previewImage = imageVal;

        //ReviewImage attribute query
        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: ['id', 'url'],
        });

        newReview.User = user;
        newReview.Spot = newSpot;
        newReview.ReviewImages = reviewImages;

        newReviews.push(newReview)
    };

    res.json({
        Reviews: newReviews
    })
});


module.exports = router;
