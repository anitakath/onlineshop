import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = (reducer) => persistReducer(persistConfig, reducer);

export default persistedReducer;
