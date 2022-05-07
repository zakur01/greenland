import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from '../redux_services/AuthServices';
let user_local = '';
if (typeof window !== 'undefined') {
  user_local = JSON.parse(localStorage.getItem('user'));
}
const initialState = {
  User: user_local ? user_local.user.username : null,
  user_id: user_local ? user_local.user.id : null,
  token: user_local ? user_local.jwt : null,
  isAuthenticated: user_local ? true : false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const RegAuth = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      return await authServices.register(formData);
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

export const LogOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authServices.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.user_id = null;
      state.User = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RegAuth.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.User = action.payload.data.user.username;
        state.token = action.payload.data.jwt;
        state.user_id = action.payload.data.user.id;
        state.isAuthenticated = true;
      })
      .addCase(RegAuth.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isAuthenticated = false;
        state.message = action.payload.data;
      });
    //   .addCase(LogOut.fulfilled, (state) => {
    //       state.
    //   })
  },
});
export const { reset } = authSlice.actions;

export default authSlice.reducer;
