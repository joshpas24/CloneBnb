import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { useModal } from "../../context/Modal";
import './DeleteModal.css';
import { thunkDeleteBooking } from '../../store/bookings';

const DeleteBooking = ({ booking }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = () => {
        dispatch(thunkDeleteBooking(booking))
            .then(closeModal)
        // alert("Booking successfully deleted")
    }

    return (
        <div className='delete-spot-modal'>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to cancel this reservation?</h3>
            <div className='delete-spot-buttons'>
                <button onClick={() => handleDelete()} className='delete-spot'>Yes (Cancel Booking)</button>
                <button className='keep-spot' onClick={closeModal}>No (Keep Booking)</button>
            </div>
        </div>
    )
}

export default DeleteBooking;
