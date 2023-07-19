import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { thunkGetUserBookings } from '../../store/bookings';
import OpenModalButton from '../OpenModalButton';
import UpdateBooking from '../UpdateBookingModal';
import DeleteBooking from '../DeleteModal/DeleteBooking';
import './ManageBookings.css'

const ManageBookings = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const bookingsObj = useSelector(state=>state.bookings.user)
    const bookings = Object.values(bookingsObj).reverse();
    console.log("bookings in manage bookings component: ", bookings)

    useEffect(() => {
        dispatch(thunkGetUserBookings())
    }, [dispatch])

    const calculateTotalPrice = (booking) => {
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);
        const timeDifference = Math.abs(endDate.getTime() - startDate.getTime());
        const numberOfNights = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        const totalPrice = booking?.Spot?.price * numberOfNights;
        return totalPrice.toLocaleString();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();

        return `${month} ${day}`;
    };

    const formatBookingDates = (booking) => {
        const startDate = new Date(booking.startDate);
        const endDate = new Date(booking.endDate);
        const currentYear = new Date().getFullYear();

        const startMonth = startDate.getMonth();
        const startDay = startDate.getDate();
        const endMonth = endDate.getMonth();
        const endDay = endDate.getDate();

        if (startDate.getFullYear() === endDate.getFullYear()) {
          if (startMonth === endMonth) {
            return `${formatDate(startDate)} - ${endDay}`;
          } else {
            return `${formatDate(startDate)} - ${formatDate(endDate)}`;
          }
        } else {
          if (startDate.getFullYear() === currentYear) {
            return `${formatDate(startDate)} - ${formatDate(endDate)}, ${endDate.getFullYear()}`;
          } else {
            return `${formatDate(startDate)}, ${startDate.getFullYear()} - ${formatDate(endDate)}, ${endDate.getFullYear()}`;
          }
        }
    };

    const viewSpot = (booking) => {
        history.push(`/spots/${booking.Spot.id}`);
    }

    const toggleReview = (booking) => {
        const endDate = new Date(booking.endDate);
        const currentDate = new Date();

        if (endDate <= currentDate) {
            return (
                <button className='small-button' onClick={() => viewSpot(booking)}>Add Review</button>
            )
        } else {
            return null;
        }
    }

    const toggleUpdate = (booking) => {
        const endDate = new Date(booking.endDate);
        const currentDate = new Date();

        if (endDate <= currentDate) {
            return null;
        } else {
            return (
                <OpenModalButton
                className="small-button"
                buttonText="Update"
                modalComponent={<UpdateBooking booking={booking} />} />
            )
        }
    }

    const toggleDelete = (booking) => {
        const startDate = new Date(booking.startDate);
        const currentDate = new Date();

        if (startDate <= currentDate) {
            return null;
        } else {
            return (
                <OpenModalButton
                    className="small-button"
                    buttonText="Cancel"
                    modalComponent={<DeleteBooking booking={booking} />} />
            )
        }
    }

    return (
        <>
            <h1>Manage Bookings</h1>
            <div className='bookings-list'>
                {bookings.map((booking) => (
                    <div className='booking-box'>
                        <div className='booking-image' onClick={() => viewSpot(booking)} title="View Spot">
                            <img src={booking?.Spot?.previewImage} alt="Spot Image"/>
                        </div>
                        <div className='booking-info'>
                            <div className='booking-info-top'>
                                <div className='booking-info-top-left'>{booking?.Spot?.name}</div>
                                <div className='booking-info-top-right'>{formatBookingDates(booking)}</div>
                            </div>
                            <div>
                                {booking?.Spot?.city}, {booking?.Spot?.state}
                            </div>
                            <div className='booking-info-price'>
                                Total before taxes: ${calculateTotalPrice(booking)}
                            </div>
                            <div className='booking-ud-buttons'>
                                {toggleReview(booking)}
                                {toggleUpdate(booking)}
                                {toggleDelete(booking)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ManageBookings;
