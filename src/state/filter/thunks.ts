import { IFilter } from './types';
import { backURL } from '../../constants/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { thunkErrorHandler } from '@state/helpers';
import axios from 'axios';

export const fetchFilter = createAsyncThunk(
  'filter/fetchFilter',
  async (data: string | undefined, thunkAPI) => {
    try {
      const response = await axios.get(`${backURL}/filter`, {
        params: {
          userId: data,
        },
      });
      return response.data;
    } catch (error) {
      return thunkErrorHandler(thunkAPI, error);
    }
  },
);

export const updateFilter = createAsyncThunk('filter/updateFilter', async (data: IFilter, thunkAPI) => {
  try {
    const response = await axios.put(`${backURL}/filter`, data);
    return response.data;
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});

export const fetchMarks = createAsyncThunk('filter/marks', async (data, thunkAPI) => {
  try {
    const response = await axios.get(`${backURL}/filter/marks`);
    return response.data;
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});

export const fetchModels = createAsyncThunk('filter/models', async (data: string | undefined, thunkAPI) => {
  try {
    const response = await axios.get(`${backURL}/filter/models`, {
      params: {
        mark: data,
      },
    });
    return response.data;
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});

export const fetchCities = createAsyncThunk('filter/cities', async (data: string | undefined, thunkAPI) => {
  try {
    const response = await axios.get(`${backURL}/filter/cities`);
    return response.data;
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});
