import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { thunkGetSpots } from '../../store/spots';
import './Spots.css';

const SpotsIndex = () => {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state=>state.spots);
    const spots = Object.values(spotsObj);
    console.log("from the Spots component: ", spots);

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    return (
        <div className='spotsGrid'>
            {spots.map((spot) => (
                <div className='spotBox'>
                    <div className='spotImageDiv'>
                        <img src={`${spot.previewImage}`} className='spotImage'/>
                    </div>
                    <div className='spotInfo'>
                        <div className='spotInfoTop'>
                            <div>{`${spot.city}`}</div>
                            <div className='spotInfoRating'>
                                <i className="fa-solid fa-star"></i>
                                <div>{spot.avgRating === null ? "N/A" : `${spot.avgRating}`}</div>
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
