import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import fetchReducer from "../reducers/dashboardSlice";
import countryReducer from "../reducers/countrySlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

// Store Information(Logged in)

const persistConfig = {
  key: "loggedin_user",
  storage,
};

// Users Infromation after API Fetched
const userPersistConfig = {
  key: "users",
  storage,
};

// Countries Infromation after API Fetched
const countryPersistConfig = {
  key: "country",
  storage,
};

const persistedReducer_user = persistReducer(persistConfig, userReducer);
const persistedReducer_fetchedUser = persistReducer(
  userPersistConfig,
  fetchReducer
);
const persistedReducer_country = persistReducer(
  countryPersistConfig,
  countryReducer
);


export const store = configureStore({
  reducer: {
    user: persistedReducer_user,
    userList: persistedReducer_fetchedUser,
    countryList: persistedReducer_country,
    middleware: [thunk],
  },
});

export const persistor = persistStore(store);
