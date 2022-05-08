import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../redux_slices/AuthSlice';
import SavedBinReducer from '../redux_slices/SavedBinSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    savedbin: SavedBinReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // devTools:
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__(),
});
