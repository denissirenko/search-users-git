import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import searchUsers from '../features/searchUsers/searchUsersSlice';
import searchRepo from '../features/searchRepo/searchRepoSlice';
import usersSlice from '../features/users/usersSlice';
import allUsersSlice from '../features/allUsers/allUsersSlice';
import infoSlice from '../features/userDetails/userDetailsSlice';

const rootReducer = combineReducers({
  searchUsers,
  searchRepo,
  users: usersSlice,
  allusers: allUsersSlice,
  info: infoSlice,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['users', 'info', 'allusers'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
