import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SavedBinServices from '../redux_services/SavedBinServices';

const initialState = {
  saved_items: [],
  bin_items: [],
  // isAuthenticated: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
};
