import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  message: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, action) => {
      state.open = true;
      state.message = action.payload;
    },
    close: (state) => {
      state.open = false;
    },
  },
});

export const { open, close } = modalSlice.actions;

export default modalSlice.reducer;
