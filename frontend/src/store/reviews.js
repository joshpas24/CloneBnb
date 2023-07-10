import { csrfFetch } from "./csrf";
// import { restoreUser } from "./session";


//ACTION TYPES
export const LOAD_SPOT_REVIEWS = "reviews/getSpotReviews";
export const LOAD_USER_REVIEWS = "reviews/getUserReviews";
export const DELETE_REVIEW = "reviews/deleteReview";
export const CREATE_REVIEW = "reviews/createReview";

//ACTION CREATORS
export const getSpotReviews = (reviews) => {
    return {
        type: LOAD_SPOT_REVIEWS,
        reviews
    }
};

export const getUserReviews = (reviews) => {
    return {
        type: LOAD_USER_REVIEWS,
        reviews
    }
}

export const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

export const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

//THUNKS
export const thunkGetSpotReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });

    // const user = dispatch(restoreUser())

    if (res.ok) {
        const data = await res.json();
        // data.User = user;
        // console.log("data from reviews thunk: ", data.Reviews)
        dispatch(getSpotReviews(data.Reviews))
        return data;
    }
};

export const thunkGetUserReviews = () => async (dispatch) => {
    const res = await fetch(`api/reviews/current`, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getUserReviews(data.Reviews))
    }
};

export const thunkDeleteReview = (review) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    });
    const data = await res.json();
    console.log("data from thunk: ", data)

    if (res.ok) {
        dispatch(deleteReview(review))
        return;
    }
}

export const thunkCreateReview = (review, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
    })
    const data = await res.json();
    console.log("data from thunk: ", data)
    dispatch(createReview(data))
    return data;
}

const initialState = { spot: {}, user: {} }

//REDUCER
export const reviewsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOT_REVIEWS:
            newState = { ...state, spot: {}, user: { ...state.user }  };
            action.reviews.forEach(review => {
                newState.spot[review.id] = review
            });
            return newState;
        case LOAD_USER_REVIEWS:
            newState = { ...state };
            action.reviews.forEach(review => {
                newState.user[review.id] = review
            });
            return newState;
        case DELETE_REVIEW:
            newState = { ...state, spot: { ...state.spot }, user: {} }
            delete newState.spot[action.review.id]
            return newState;
        case CREATE_REVIEW:
            newState = { ...state, spot: { ...state.spot }, user: {} }
            newState.spot[action.review.id] = action.review
            return newState;
        default:
            return state;
    }
}
