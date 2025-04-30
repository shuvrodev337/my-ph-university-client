import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer, //instead of authReducer, we pass  persistedAuthReducer, as we want to persist it
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

/**
 * redux-persist is a library used with Redux (a state management tool for JavaScript applications) that
 * allows us to persist and rehydrate our Redux state between page reloads or app restarts.

 ***redux persist steps***
 * create config, give a name of the config as 'key', import storage an set it as "storage"
 * create persisted Reducer, call persistReducer and pass 1st-> created config 2nd-> the reducer we want to persist
 * inside configureStore-> add persisted Reducer instead of normal reducer
 * create and export persistor , pass the store into persistStore function,
 * wrap application with PersistGate.
 * redux persist stores persisted reducer in local storage internally.
 * solve "non-serializable value was detected in an action" error
 * A non-serializable object is an js object with method, in the action that redux persist triggers, there can be serializable objects.
 * Solution-> doc-> https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist,
 * inside getDefaultMiddleware, add serializableCheck where mention the ignoredActions from redux-persist that can return non-serializable object
 */
