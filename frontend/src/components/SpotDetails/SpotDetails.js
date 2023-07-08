import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpot } from '../../store/spots';
import ReviewsIndex from '../Reviews';
import OpenModalButton from '../OpenModalButton';
import './SpotDetails.css';
import CreateReview from '../CreateReviewModal';

function SpotDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const spotsObj = useSelector(state=>state.spots)
    const spot = spotsObj.singleSpot

    const user = useSelector(state=>state.session.user)

    const reviewsObj = useSelector(state=>state.reviews.spot);

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
    }, [dispatch])

    if (!spot.SpotImages) return null;
    const images = Object.values(spot.SpotImages)
    // console.log("images: ",images)

    const reviews = Object.values(reviewsObj)
    const existingReview = reviews.find(review=>review.userId === user.id)
    const toggleCreateReview = () => {
        if ((spot.ownerId === user.id) || existingReview) {
            return true
        } else {
            return false
        }
    }

    const handleReserve = () => {
        alert('Feature coming soon!')
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
                    <div className='host'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                    <div>{spot.description}</div>
                </div>
                <div className='reserve-box'>
                    <div className='reserve-top'>
                        <div className='reserve-price'><span>${spot.price}</span> night</div>
                        <div className='reserve-top-right'>
                            <i className="fa-solid fa-star"></i>
                            {reviews.length === 0 ? "New · 0 reviews" : `${spot.avgStarRating ? spot.avgStarRating.toFixed(1) : ""} · ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`}
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
                    {reviews.length === 0 ? "New · 0 reviews" : `${spot.avgStarRating ? spot.avgStarRating.toFixed(1) : ""} · ${reviews.length} ${reviews.length === 1 ? "review" : "reviews"}`}
                </h3>
                <div className='add-review'>
                    {toggleCreateReview() ? "" : <OpenModalButton
                            className="small-button"
                            buttonText="Add Review"
                            modalComponent={<CreateReview spotId={spot.id}/>}
                            />
                    }
                </div>
                <ReviewsIndex parent="spot" />
            </div>
        </div>
    )
}

export default SpotDetails;
