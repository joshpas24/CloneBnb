import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { thunkDeleteSpot } from '../../store/spots';
import { useModal } from "../../context/Modal";
import './DeleteModal.css';


const DeleteSpotModal = ({ spot }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(thunkDeleteSpot(spot))
            .then(closeModal)
        history.push("/spots/current")
    }

    return (
        <div className='delete-spot-modal'>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to remove this spot from listings?</h3>
            <div className='delete-spot-buttons'>
                <button onClick={() => handleDelete()} className='delete-spot'>Yes (Delete Spot)</button>
                <button className='keep-spot' onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
}

export default DeleteSpotModal;
