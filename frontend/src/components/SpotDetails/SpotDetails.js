import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkGetSpot } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import './SpotDetails.css';
import CreateReview from '../CreateReviewModal';
import { thunkGetSpotReviews, thunkDeleteReview } from '../../store/reviews';
import DeleteReviewModal from '../DeleteModal/DeleteReview';

function SpotDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const [spotReviews, setSpotReviews] = useState({})

    const reviewsObj = useSelector(state=>state.reviews.spot);
    const reviews = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
        dispatch(thunkGetSpotReviews(spotId))

        // const fetchSpot = async () => {
        //     await dispatch(thunkGetSpot(spotId))
        // }
        // const fetchReview = async () => {
        //     await dispatch(thunkGetSpotReviews(spotId))
        // }
        // fetchSpot()
        // fetchReview()
    }, [dispatch])

    const spotsObj = useSelector(state=>state.spots)
    const spot = spotsObj.singleSpot

    const user = useSelector(state=>state.session.user)
    // console.log("user: ", user)
    // console.log("user firstName: ", user.firstName)


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
        alert('Feature coming soon!')
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
                        {images.map((img) => {
                            if (img.preview === true) {
                                return (
                                    <img src={img.url}/>
                                )
                            }
                        })}
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
                        <div className='reserve-price'><span>${spot.price}</span> night</div>
                        <div className='reserve-top-right'>
                            <i className="fa-solid fa-star"></i>
                            {reviews.length === 0 ? "New" : `${spot.avgStarRating ? spot.avgStarRating.toFixed(1) : ""} · ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`}
                        </div>
                    </div>
                    <button className='reserve-button'>
                        <div onClick={() => handleReserve()}>Reserve</div>
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
