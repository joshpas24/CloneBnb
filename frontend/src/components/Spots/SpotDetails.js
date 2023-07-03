import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpot } from '../../store/spots';

function SpotDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    console.log("spotId from params: ", spotId)
    const spotsObj = useSelector(state=>state.spots)
    console.log("spotsObj from component: ", spotsObj)
    const spot = spotsObj.singleSpot
    console.log("spot from SpotDetails: ", spot)
    const images = Object.values(spot.SpotImages)

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
    }, [dispatch])

    return (
        <div className='spot-details'>
            <div className='spot-top'>
                <h1>{spot.address}</h1>
                <h2>{spot.city}, {spot.state}</h2>
                <div className='image-container'>
                    <div>
                        <img src={images[0].url}/>
                    </div>
                    <div>
                        {images.length > 1 ? "" :
                            images.map((image) => {
                                <img src={image.url}/>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='spot-mid'>
                <div className='description'>
                    <h2>Hosted by {spot.Owner.firstName}</h2>
                    <h3>{spot.description}</h3>
                </div>
                <div className='reserve-box'>
                    <div className='reserve-top'>
                        <div>${spot.price} night</div>
                        <div className='reserve-top-right'>
                            <div>
                                <i className="fa-solid fa-star"></i>
                                {spot.avgStarRating}
                            </div>
                            <div>
                                {spot.numReviews} reviews
                            </div>
                        </div>
                    </div>
                    <button className='reserve-button'>Reserve</button>
                </div>
            </div>
            <div className='spot-bottom'>
                <div>
                    <i className="fa-solid fa-star"></i>
                     {spot.avgStarRating} · {spot.numReviews} {spot.numReviews.length === 1 ? "review" : "reviews"}
                </div>
                {}
            </div>
        </div>
    )
}

export default SpotDetails;
