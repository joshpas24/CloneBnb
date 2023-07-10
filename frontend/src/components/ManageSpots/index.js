import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom'
import { thunkGetSpot, thunkGetSpots } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteModal/DeleteSpot';
import './ManageSpots.css';


const ManageSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);
    const spotsObj = useSelector(state=>state.spots);
    const spotsArr = Object.values(spotsObj.allSpots);
    const spots = [];
    spotsArr.forEach(spot => {
        if (!user) {
            return;
        }

        if (spot.ownerId === user.id) {
            spots.push(spot)
        }
    })
    console.log("user spots: ", spots)

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    const getDetails = (spotId) => {
        // e.preventDefault();
        history.push(`/spots/${spotId}`)
    }

    const updateForm = (spotId) => {
        dispatch(thunkGetSpot(spotId))
        history.push(`/spots/${spotId}/update`)
        return;
    }

    function handleRender() {
        if (!spots.length) {
            return (
                <div className='no-spots-link'>
                    <NavLink to='/spots/create'>Create a New Spot</NavLink>
                </div>
            );
        } else {
            return (
                <>
                    <h1>Manage Spots</h1>
                    <div className='spotsGrid'>
                        {spots.map((spot) => (
                            <div>
                                <div className='spotBox' onClick={() => getDetails(spot.id)}>
                                    <div className='spotImageDiv'>
                                        <img src={`${spot.previewImage}`} className='spotImage' />
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
                                <div className='manage-buttons'>
                                    <button onClick={() => updateForm(spot.id)} className='small-button'>Update</button>
                                    <OpenModalButton
                                        className="small-button"
                                        buttonText="Delete"
                                        modalComponent={<DeleteSpotModal spot={spot} />} />
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            );
        }
    }

    return (
        <>
            {handleRender()}
        </>
    )
}

export default ManageSpots;
