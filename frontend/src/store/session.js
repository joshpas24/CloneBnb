import { csrfFetch } from "./csrf";

//ACTION TYPE CONSTAINTS
export const ADD_USER = "session/addUser";
export const REMOVE_USER = "session/removeUser";

//ACTION CREATORS
export const addUser = (user) => {
    return {
        type: ADD_USER,
        user
    }
};

export const removeUser = () => {
    return {
        type: REMOVE_USER,
    }
};

//THUNK
export const login = (user) => async (dispatch) => {
const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(addUser(data.user));
  return response;
}

const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case ADD_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
