import { SET_LEADERBOARD } from "./types";

export const setLeaderboard = (leaderboard) => (dispatch) => {
  dispatch({
    type: SET_LEADERBOARD,
    payload: leaderboard,
  });
};
