import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [""],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
