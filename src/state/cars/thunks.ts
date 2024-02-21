import { backURL } from '../../constants/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkErrorHandler } from '@state/helpers';
import axios from 'axios';

export const fetchCars = createAsyncThunk('cars/fetchCars', async (data, thunkAPI) => {
  try {
    const response = await axios.get(`${backURL}/cars`);
    return response.data;
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});
