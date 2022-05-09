import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import savedBinServices from '../redux_services/SavedBinServices';

const initialState = {
  saved_items: [],
  bin_items: [],
  main_items: [],
  // isAuthenticated: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const GetItems = createAsyncThunk('savedbin/get', async () => {
  try {
    return await savedBinServices.get();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const FilterItems = createAsyncThunk(
  'savedbin/filter',
  async (filt, thunkAPI) => {
    try {
      return await savedBinServices.filter(filt);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.response ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const SavedBinSlice = createSlice({
  name: 'savedbin',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GetItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(GetItems.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.main_items = action.payload.data.data;
      })
      .addCase(GetItems.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(FilterItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(FilterItems.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.main_items = action.payload.data.data;
      });
  },
});

export default SavedBinSlice.reducer;
