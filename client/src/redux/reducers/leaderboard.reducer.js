import { SET_LEADERBOARD } from "../actions/types";

const initialState = {
  leaderboard: [],
};

const leaderboardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_LEADERBOARD:
      return {
        ...state,
        leaderboard: payload,
      };
    default:
      return state;
  }
};

export default leaderboardReducer;
