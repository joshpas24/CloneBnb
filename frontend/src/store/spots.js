

//ACTION TYPES
export const LOAD_SPOTS = "spots/getSpots";
export const LOAD_SPOT = "spots/getSpot"

//ACTION CREATORS
export const getSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const getSpot = (spot) => {
    return {
        type: LOAD_SPOT,
        spot
    }
}

//THUNKS
export const thunkGetSpots = () => async (dispatch) => {
    const res = await fetch("/api/spots/", {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });

    if (res.ok) {
        const data = await res.json();
        console.log("data from thunkGetSpots: ", data)
        dispatch(getSpots(data.Spots))
    }
}

export const thunkGetSpot = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });
    console.log("response from api: ", res)

    if (res.ok) {
        const data = await res.json();
        console.log("data from thunk: ", data)
        dispatch(getSpot(data))
    }
}

const initialState = { allSpots: {}, singleSpot: {} }

//REDUCER
export const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state };
            // console.log("from the reducer: ", newState.spots)
            action.spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState;
        case LOAD_SPOT:
            newState = { ...state };
            newState.singleSpot = action.spot
            return newState;
        default:
            return state;
    }
}
