import { combineReducers } from "redux";
import leaderboardReducer from "./reducers/leaderboard.reducer";
import userReducer from "./reducers/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  leaderboard: leaderboardReducer,
});

export default rootReducer;
