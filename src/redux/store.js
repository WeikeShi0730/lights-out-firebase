import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./root-reducer";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [""],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

var store;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middleware), composeWithDevTools())
  );
} else {
  // production code
  store = createStore(
    persistedReducer,
    compose(applyMiddleware(...middleware))
  );
}

const persistor = persistStore(store);

export { store, persistor };
