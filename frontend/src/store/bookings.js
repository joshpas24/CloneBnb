import { csrfFetch } from "./csrf";

//ACTION TYPES
export const LOAD_SPOT_BOOKINGS = "bookings/getSpotBookings";
export const LOAD_USER_BOOKINGS = "bookings/getUserBookings";
export const ADD_SPOT_BOOKING = "bookings/createSpotBooking";
export const UPDATE_BOOKING = "bookings/updateBooking";
export const DELETE_BOOKING = "bookings/deleteBooking";

//ACTION CREATORS
export const getSpotBookings = (bookings) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookings
    }
};

export const getUserBookings = (bookings) => {
    return {
        type: LOAD_USER_BOOKINGS,
        bookings
    }
}

export const createSpotBooking = (booking) => {
    return {
        type: ADD_SPOT_BOOKING,
        booking
    }
}

export const updateBooking = (booking) => {
    return {
        type: UPDATE_BOOKING,
        booking
    }
}

export const deleteBooking = (booking) => {
    return {
        type: DELETE_BOOKING,
        booking
    }
}

//THUNKS
export const thunkGetSpotBookings = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/bookings`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(getSpotBookings(data.Bookings))
    }
}

export const thunkGetUserBookings = () => async (dispatch) => {
    const res = await csrfFetch("/api/bookings/current");

    if (res.ok) {
        const data = await res.json();
        console.log(data)
        dispatch(getUserBookings(data.Bookings))
    }
}

export const thunkBookSpot = (spotId, startDate, endDate) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spotId}/bookings`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ startDate, endDate })
        });
        console.log("res from thunk: ", res)

        if (res.ok) {
            const data = await res.json()
            dispatch(createSpotBooking(data))
            return data
        }
    } catch (error) {
        const data = await error.json();
        console.log("error received in thunk: ", data)
        return data;
    }
}

export const thunkUpdateBooking = (booking) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/bookings/${booking.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(booking)
        });
        const data = await res.json();

        if (res.ok) {
            // dispatch(updateBooking(data))
            dispatch(thunkGetUserBookings())
        }

        return data;
    } catch (errors) {
        console.log("error received in thunk: ", errors)
        const error = await errors.json();
        return error;
    }
}

export const thunkDeleteBooking = (booking) => async (dispatch) => {
    const res = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    });

    if (res.ok) {
        dispatch(deleteBooking(booking))
    }
}

const initialState = { spot: {}, user: {} }

//REDUCER
export const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOT_BOOKINGS:
            newState = { ...state, spot: { ...state.spot }, user: { ...state.user } };
            action.bookings.forEach(booking => {
                newState.spot[booking.id] = booking
            });
            return newState;
        case LOAD_USER_BOOKINGS:
            newState = { ...state, spot: { ...state.spot }, user: {} }
            action.bookings.forEach(booking => {
                newState.user[booking.id] = booking
            });
            return newState;
        case ADD_SPOT_BOOKING:
            newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            newState.spot[action.booking.id] = action.booking;
            // newState.user[action.booking.id] = action.booking;
            return newState;
        case UPDATE_BOOKING:
            newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            newState.spot[action.booking.id] = action.booking
            newState.user[action.booking.id] = action.booking
            return newState;
        case DELETE_BOOKING:
            newState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            delete newState.spot[action.booking.id]
            delete newState.user[action.booking.id]
            return newState;
        default:
            return state;
    }
}
