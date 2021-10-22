import { SET_CURRENT_USER } from "./types";

export const setCurrentUser = (currentUser) => (dispatch) => {
  dispatch({
    type: SET_CURRENT_USER,
    payload: currentUser,
  });
};
