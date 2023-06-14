const express = require('express');
const { Op } = require('sequelize');
const { Spot, Review, SpotImage, User, sequelize } = require('../../db/models');
const {requireAuth} = require('../../utils/auth')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();

// const validateSpot = [
//     check('address')
//       .exists({ checkFalsy: true })
//       .withMessage('Street address is required.'),
//     check('city')
//       .exists({ checkFalsy: true })
//       .withMessage('Please provide a username with at least 4 characters.'),
//     check('state')
//       .exists({ checkFalsy: true })
//       .withMessage('State is required'),
//     check('country')
//       .exists({ checkFalsy: true })
//       .withMessage('Country is required'),
//     check('lat')
//       .exists({ checkFalsy: true })
//       .isNumber()
//       .withMessage('Latitude is not valid'),
//     check('lng')
//       .exists({ checkFalsy: true })
//       .isNumber()
//       .withMessage('Longitude is not valid'),
//     check('name')
//       .exists({ checkFalsy: true })
//       .withMessage('Name must be less than 50 characters'),
//     check('description')
//       .exists({ checkFalsy: true })
//       .withMessage('Description is required'),
//     check('price')
//       .exists({ checkFalsy: true })
//       .withMessage('Price per day is required'),
//     handleValidationErrors
// ];

//Get all spots
router.get('/', async(req, res) => {
    const spots = await Spot.findAll({
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col("Reviews.stars")), "avgRating"],
            ]
        },
        include: [
            {
              model: Review,
              attributes: [],
            },
            {
              model: SpotImage,
              attributes: [['url', 'previewImage']],
            },
        ],
        group: ["Spot.id"]
    })

    res.json(spots)
});

//Get all spots owned by current user
router.get('/current', requireAuth, async(req, res) => {
    const spot = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        attributes: {
            include: [
                [sequelize.fn('AVG', sequelize.col("Reviews.stars")), "avgRating"],
                [sequelize.literal('(SELECT url FROM SpotImages WHERE SpotImages.spotId = Spot.id)'),'previewImage'],
            ]
        },
        include: [
            {
              model: Review,
              attributes: [],
            },
            {
              model: SpotImage,
              attributes: [],
            },
        ]
    });

    res.json(spot)
});

//Get details of a Spot from an id
router.get('/:id', requireAuth, async (req, res) => {
    const reviewCount = await Review.count({
        where: {
            spotId: req.params.id
        }
    });
    // console.log(reviewCount)

    const spot = await Spot.findByPk(req.params.id, {
        attributes: {
            include: [
                // [reviewCount, "numReviews"],
                [sequelize.literal('(SELECT COUNT(*) FROM "Reviews" WHERE "Reviews"."spotId" = "Spot"."id")'), "numReviews"],
                [sequelize.fn('AVG', sequelize.col("Reviews.stars")), "avgRating"],
            ]
        },
        include: [
            {
                model: Review,
                attributes: [],
            },
            {
              model: SpotImage,
              attributes: ['id', 'url', 'preview'],
            },
            {
              model: User,
            //   name: 'Owner',
              attributes: ['id', 'firstName', 'lastName'],
              as: 'Owner'
            }
        ]
    });

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found"
        })
    }

    res.json(spot);
});

//Create a spot
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const newSpot = await Spot.create({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });


})

module.exports = router
