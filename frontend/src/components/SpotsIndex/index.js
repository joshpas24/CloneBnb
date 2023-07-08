import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { thunkGetSpots } from '../../store/spots';
import './Spots.css';

const SpotsIndex = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spots.allSpots);
    console.log("state obj from index component: ", spotsObj)
    const spots = Object.values(spotsObj);
    // console.log("from the Spots component: ", spots);

    // const spots = useSelector(state=>state.spots.allSpots);

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    const getDetails = (spotId) => {
        // e.preventDefault();
        history.push(`/spots/${spotId}`)
    }

    return (
        <div className='spotsGrid'>
            {spots.map((spot) => (
                <div className='spotBox' onClick={() => getDetails(spot.id)} key={spot.id}>
                    <div className='spotImageDiv'>
                        <img src={`${spot.previewImage}`} className='spotImage'/>
                    </div>
                    <div className='spotInfo'>
                        <div className='spotInfoTop'>
                            <div>{`${spot.city}, ${spot.state}`}</div>
                            <div className='spotInfoRating'>
                                <i className="fa-solid fa-star"></i>
                                <div>{!spot.avgRating ? "New" : `${spot.avgRating.toFixed(1)}`}</div>
                            </div>
                        </div>
                        <div className='spotInfoBottom'>
                            {`$${spot.price} night`}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SpotsIndex;
