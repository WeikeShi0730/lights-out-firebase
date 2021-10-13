import { SET_LEADERBOARD, SET_CURRENT_USER } from "./types";

export const setCurrentUser = (currentUser) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: currentUser,
  });
};

export const setLeaderboard = (leaderboard) => (dispatch) => {
  dispatch({
    type: SET_LEADERBOARD,
    payload: leaderboard,
  });
};
