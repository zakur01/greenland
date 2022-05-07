import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../redux_slices/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // devTools:
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__(),
});
