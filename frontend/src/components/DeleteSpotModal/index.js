import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { thunkDeleteSpot } from '../../store/spots';
import { useModal } from "../../context/Modal";


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
        <>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to remove this spot from listings?</h3>
            <button onClick={() => handleDelete()}>Yes (Delete Spot)</button>
            <button>No (Keep Spot)</button>
        </>
    )
}

export default DeleteSpotModal;
