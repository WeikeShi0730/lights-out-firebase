import { SET_CURRENT_USER, SET_LEADERBOARD } from "../actions/types";

const initialState = {
  currentUser: null,
  leaderboard: [],
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case SET_LEADERBOARD:
      return {
        ...state,
        leaderboard: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
