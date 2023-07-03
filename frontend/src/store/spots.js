

//ACTION TYPES
export const LOAD_SPOTS = "spots/getSpots";

//ACTION CREATORS
export const getSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

//THUNKS
export const thunkGetSpots = () => async (dispatch) => {
    const res = await fetch("/api/spots", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });

    if (res.ok) {
        const data = await res.json();
        // console.log("data from thunk: ", data)
        dispatch(getSpots(data))
    }
}

//REDUCER
export const spotsReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state };
            // console.log("from the reducer: ",action.spots)
            action.spots.Spots.forEach(spot => {
                newState[spot.id] = spot
            });
            return newState;
        default:
            return state;
    }
}
