import { csrfFetch } from "./csrf";

//ACTION TYPE CONSTAINTS
export const ADD_USER = "session/setUser";
export const REMOVE_USER = "session/removeUser";

//ACTION CREATORS
export const setUser = (user) => {
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
  dispatch(setUser(data.user));
  return response;
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const signup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};


//REDUCER
const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case ADD_USER:
            newState = {...state};
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = {...state};
            newState.user = null;
            return newState;
        default:
            return state;
    }
};

export default sessionReducer;
