import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { thunkGetSpots } from '../../store/spots';
import './Spots.css';
import ImageCarousel from '../Carousel';

const SpotsIndex = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spots.allSpots);
    const spots = Object.values(spotsObj);

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    const getDetails = (spotId) => {
        history.push(`/spots/${spotId}`)
    }

    return (
        <div className='spotsGrid'>
            {spots.map((spot) => (
                <div className='spotBox' key={spot.id} title={spot.name}>
                    <div className='spotImageDiv'>
                        <ImageCarousel images={spot.images} type='grid'/>
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
                            {`$${spot.price.toLocaleString()} night`}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SpotsIndex;
