import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import './DeleteModal.css';
import { thunkDeleteReview } from '../../store/reviews';
import { thunkGetSpot } from '../../store/spots';


const DeleteReviewModal = ({ review, spotId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(thunkDeleteReview(review))
            .then(dispatch(thunkGetSpot(spotId)))
            .then(closeModal)
        history.push(`/spots/${spotId}`)
    }

    return (
        <div className='delete-spot-modal'>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this review?</h3>
            <div className='delete-spot-buttons'>
                <button onClick={() => handleDelete()} className='delete-spot'>Yes (Delete Review)</button>
                <button className='keep-spot' onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal;
