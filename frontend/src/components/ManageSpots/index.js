import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { thunkGetSpot, thunkGetSpots } from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';
import SpotForm from '../SpotForm/CreateSpot';


const ManageSpots = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.session.user);
    const spotsObj = useSelector(state=>state.spots);
    const spotsArr = Object.values(spotsObj.allSpots);
    const spots = [];
    spotsArr.forEach(spot => {
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
        // return (
        //     <SpotForm formtype={'update'} />
        // )
    }

    return (
        <>
            <h1>Manage Spots</h1>
            <div className='spotsGrid'>
                {spots.map((spot) => (
                    <div>
                        <div className='spotBox' onClick={() => getDetails(spot.id)}>
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
                        <div>
                            <button onClick={() => updateForm(spot.id)}>Update</button>
                            <OpenModalButton
                            className="delete-button"
                            buttonText="Delete"
                            modalComponent={<DeleteSpotModal spot={spot}/>}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ManageSpots;
