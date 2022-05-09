import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import savedBinServices from '../redux_services/SavedBinServices';

const savedItemsLocal =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('favorites'))
    : [];

const initialState = {
  saved_items: savedItemsLocal ? savedItemsLocal : [],
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

export const AddToFavorites = createAsyncThunk(
  'savedbin/addtofavorites',
  async (title) => {
    try {
      return await savedBinServices.addToFavorites(title);
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

// export const CleanFavorites = createAsyncThunk(
//   'savedbin/cleanfavorites',
//   async () => {
//     try {
//       return await savedBinServices.cleanFavorites();
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.response ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

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
  reducers: {
    CleanFavorites: (state) => {
      state.saved_items = [];
    },
  },
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
      })
      .addCase(AddToFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AddToFavorites.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.saved_items.push(action.payload.data.data[0]);
      });
    // .addCase(CleanFavorites.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(CleanFavorites.fulfilled, (state) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.saved_items = [];
    // });
  },
});
export const { CleanFavorites } = SavedBinSlice.actions;

export default SavedBinSlice.reducer;
