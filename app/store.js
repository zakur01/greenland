import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../redux_slices/AuthSlice';
import SavedBinReducer from '../redux_slices/SavedBinSlice';
import ModalReducer from '../redux_slices/ModalSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    savedbin: SavedBinReducer,
    modal: ModalReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  // devTools:
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__(),
});
