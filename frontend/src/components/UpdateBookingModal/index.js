import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './UpdateBooking.css';
import { thunkUpdateBooking } from '../../store/bookings';
import { useModal } from "../../context/Modal";

const UpdateBooking = ({ booking }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state=>state.session.user.id)

    const [startDate, setStartDate] = useState(new Date(booking.startDate));
    const [endDate, setEndDate] = useState(new Date(booking.endDate));
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedBooking = {
            id: booking.id,
            spotId: booking.spotId,
            userId: userId,
            startDate: startDate,
            endDate: endDate
        }

        dispatch(thunkUpdateBooking(updatedBooking))
            .then((res) => {
                if (res.errors) {
                    setErrors(res.errors)
                }
            }).then(closeModal)
    }

    return (
        <div className="update-booking-modal">
            <h2>Update Booking</h2>
            <div className='update-date-box'>
                <div className='update-date' id='update-date-left'>
                    <div className='update-date-check'>CHECK-IN</div>
                    <DatePicker
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        dateFormat="MM/dd/yyyy"
                    />
                </div>
                <div className='update-date'>
                    <div className='update-date-check'>CHECKOUT</div>
                    <DatePicker
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        dateFormat="MM/dd/yyyy"
                    />
                </div>
            </div>
            <button className='update-button' onClick={(e) => handleUpdate(e)}>Update</button>
        </div>
    )
}

export default UpdateBooking;
