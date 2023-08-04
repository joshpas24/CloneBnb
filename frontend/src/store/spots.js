import { csrfFetch } from "./csrf";

//ACTION TYPES
export const LOAD_SPOTS = "spots/getSpots";
export const LOAD_SPOT = "spots/getSpot";
export const CREATE_SPOT = "spots/createSpot";
export const DELETE_SPOT = "spots/deleteSpot";
export const UPDATE_SPOT = "spots/updateSpot";

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

export const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    }
}

export const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
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
    // console.log("response from api: ", res)

    if (res.ok) {
        const data = await res.json();
        // console.log("data from thunk: ", data)
        dispatch(getSpot(data))
        return data
    }
}

export const thunkCreateSpot = (spot, images, buffer) => async (dispatch) => {
    console.log(images)
    try {
        const res = await csrfFetch("/api/spots", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(spot)
        });

        const data = await res.json();

        console.log("data from create thunk: ", data)
        dispatch(thunkAddImageToSpot(data, images, buffer))

        return data

    } catch (error) {
        const errors = await error.json()
        return errors
    }
}

export const thunkAddImageToSpot = (spot, images, buffer) => async (dispatch) => {
    console.log("images arg received from dispatch: ", images)


    if (buffer) {
        images.forEach((image) => {
            console.log("image sent to backend: ",image)
            const formData = new FormData();
            formData.append("image", image);

            csrfFetch(`/api/upload/${spot.id}/aws`, {
                method: "POST",
                // headers: {"Content-Type": "multipart/form-data"},
                body: formData
            })
        })
    } else {
        images.forEach( async (image) => {
            const res = await csrfFetch(`/api/spots/${spot.id}/images`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(image)
            })
        })
    }

    dispatch(createSpot(spot))
}

export const thunkDeleteSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    });

    if (res.ok) {
        dispatch(deleteSpot(spot))
    }
}

export const thunkUpdateSpot = (spot) => async (dispatch) => {
    try {
        const res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(spot)
        });
        const data = await res.json();
        console.log("data from thunk: ", data)

        if (res.ok) {
            dispatch(updateSpot(data))
        }

        return data;
    } catch (error) {
        const errors = await error.json();
        return errors
    }

}

const initialState = { allSpots: {}, singleSpot: {} }

//REDUCER
export const spotsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOTS:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} };
            action.spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            });
            return newState;
        case LOAD_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} };
            newState.singleSpot = action.spot
            return newState;
        case CREATE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...action.spot } };
            newState.allSpots[action.spot.id] = action.spot
            return newState;
        case DELETE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: {} }
            delete newState.allSpots[action.spot.id]
            return newState;
        case UPDATE_SPOT:
            newState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...action.spot } };
            newState.allSpots[action.spot.id] = action.spot
            return newState
        default:
            return state;
    }
}
