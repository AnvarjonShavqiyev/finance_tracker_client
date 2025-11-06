import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "@services/api";
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
import storage from "redux-persist/lib/storage";
import userReducer from './reducers/user.reducer';
import dialogReducer from './reducers/dialog.reducer';
import settingsReducer from './reducers/settings.reducer';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userReducer,
  dialog: dialogReducer,
  settings: settingsReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['user', 'dialog', 'settings'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
