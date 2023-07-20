import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { thunkGetSpot } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import './SpotDetails.css';
import CreateReview from '../CreateReviewModal';
import { thunkGetSpotReviews } from '../../store/reviews';
import DeleteReviewModal from '../DeleteModal/DeleteReview';
import { thunkBookSpot } from '../../store/bookings';


function SpotDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [bookingError, setBookingError] = useState("");

    const reviewsObj = useSelector(state=>state.reviews.spot);
    const reviews = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
        dispatch(thunkGetSpotReviews(spotId))
    }, [dispatch])

    useEffect(() => {
        setEndDate(startDate)
    }, [startDate])

    const spotsObj = useSelector(state=>state.spots)
    const spot = spotsObj.singleSpot

    const user = useSelector(state=>state.session.user)

    if (!spot.SpotImages) return null;
    const images = Object.values(spot.SpotImages)
    // console.log("images: ",images)

    let existingReview

    if (user) {
        existingReview = reviews.find(review=>review.userId === user.id)
    }

    const toggleCreateReview = () => {
        if (!user) {
            return "";
        }

        if ((spot.ownerId === user.id) || existingReview) {
            return "";
        } else {
            return (
                <OpenModalButton
                    className="small-button"
                    buttonText="Post Your Review"
                    modalComponent={<CreateReview spotId={spot.id}/>}
                />
            )
        }
    }

    const toggleDeleteReview = (review, spotId) => {
        if (!user) {
            return "";
        }

        if (review.userId === user.id) {
            return (
                <OpenModalButton
                    className="small-button"
                    buttonText="Delete"
                    modalComponent={<DeleteReviewModal review={review} spotId={spotId}/>}
                />
            )
        } else {
            return "";
        }
    }

    const handleReserve = () => {
        if (!user) {
            alert('You must be logged in book a reservation.')
        } else if (user.id === spot.ownerId) {
            alert('You cannot make reservations on your own spot.')
        } else {
            console.log(startDate, endDate)
            dispatch(thunkBookSpot(spot.id, startDate, endDate))
                .then((res) => {
                    if (res && res.errors) {
                        console.log(res.errors.message)
                        setBookingError(res.message)
                    } else {
                        history.push("/bookings/current") //add manage bookings
                    }
                })
        }
    }

    const handleReviewName = (review) => {
        if (user) {
            if (review.userId === user.id) {
                return user.firstName
            } else {
                return review.User.firstName
            }
        } else {
            return review.User.firstName
        }
    }

    const handleReviewList = () => {
        if (user && !reviews.length) {
            return (
                <>
                    <h4>Be the first to post a review!</h4>
                </>
            )
        } else {
            const res = (reviews.slice().reverse().map(review => (
                <div className='review'>
                    <div className='review-name'>{handleReviewName(review)}</div>
                    <div className='review-date'>{formatDate(review.createdAt)}</div>
                    <div className='review-review'>{review.review}</div>
                    {toggleDeleteReview(review, spot.id)}
                </div>
            )))

            return res;
        }
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    return (
        <div className='spot-details'>
            <div className='spot-top'>
                <div id='title'>{spot.name}</div>
                <div id='location'>{spot.city}, {spot.state}</div>
                <div className='image-container'>
                    <div className='preview-image'>
                        {/* {images.map((img) => {
                            if (img.preview === true) {
                                return (
                                    <img src={img.url}/>
                                )
                            }
                        })} */}
                        <img src={images[0].url}/>
                    </div>
                    <div className="other-images">
                        {images.length <= 1 ? "" :
                            images.map((image) => {
                                if (!image.preview) {
                                    return (
                                        <img src={image.url}/>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='spot-mid'>
                <div className='description'>
                    <div className='host'>Hosted by {spot.Owner && spot.Owner.firstName} {spot.Owner && spot.Owner.lastName}</div>
                    <div>{spot.description}</div>
                </div>
                <div className='reserve-box'>
                    <div className='reserve-top'>
                        <div className='reserve-price'><span className='spot-price'>${spot.price}</span> night</div>
                        <div className='reserve-top-right'>
                            <i className="fa-solid fa-star"></i>
                            {reviews.length === 0 ? "New" : `${spot.avgStarRating ? spot.avgStarRating.toFixed(1) : ""} · ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`}
                        </div>
                    </div>
                    <div className='date-box'>
                        <div className='date' id='date-left'>
                            <div className='date-check'>CHECK-IN</div>
                            <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="MM/dd/yyyy"
                            />
                        </div>
                        <div className='date'>
                            <div className='date-check'>CHECKOUT</div>
                            <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            dateFormat="MM/dd/yyyy"
                            />
                        </div>
                    </div>
                    <button className='reserve-button' onClick={() => handleReserve()}>
                        <div>Reserve</div>
                    </button>
                </div>
            </div>
            <div className='spot-bottom'>
                <h3 className='spot-bottom-header'>
                    <i className="fa-solid fa-star"></i>
                    {reviews.length === 0 ? "New" : `${spot.avgStarRating ? spot.avgStarRating.toFixed(1) : ""} · ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`}
                </h3>
                <div className='add-review'>
                    {toggleCreateReview()}
                </div>
                {handleReviewList()}
            </div>
        </div>
    )
}

export default SpotDetails;
