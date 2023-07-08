//ACTION TYPES
export const LOAD_SPOT_BOOKINGS = "bookings/getSpotBookings";
export const LOAD_USER_REVIEWS = "bookings/getUSERBookings";

//ACTION CREATORS
export const getSpotBookings = (bookings) => {
    return {
        type: LOAD_SPOT_BOOKINGS,
        bookings
    }
};

export const getUserBookings = (bookings) => {
    return {
        type: LOAD_USER_REVIEWS,
        bookings
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

const initialState = { spot: {}, user: {} }

//REDUCER
export const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOT_BOOKINGS:
            newState = { ...state };
            action.bookings.forEach(booking => {
                newState.spot[booking.id] = booking
            });
            return newState;
        default:
            return state;
    }
}
