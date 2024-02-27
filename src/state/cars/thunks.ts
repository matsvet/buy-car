import { ICar, ICarRequestParams, ICarResponse } from './types';
import { backURL } from '../../constants/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { thunkErrorHandler } from '@state/helpers';
import axios from 'axios';

export const fetchCars = createAsyncThunk('cars/fetchCars', async (data: ICarRequestParams, thunkAPI) => {
  try {
    const response = await axios.get(`${backURL}/cars`, {
      params: data,
    });
    return response.data as ICarResponse | null;
  } catch (error) {
    return thunkErrorHandler(thunkAPI, error);
  }
});

export const fetchFavorites = createAsyncThunk(
  'cars/fetchFavorites',
  async (data: string | undefined, thunkAPI) => {
    try {
      const response = await axios.get(`${backURL}/favorites`, {
        params: {
          userId: data,
        },
      });
      return response.data as ICar[] | null;
    } catch (error) {
      return thunkErrorHandler(thunkAPI, error);
    }
  },
);

export const fetchCompared = createAsyncThunk(
  'cars/fetchCompared',
  async (data: string | undefined, thunkAPI) => {
    try {
      const response = await axios.get(`${backURL}/compared`, {
        params: {
          userId: data,
        },
      });
      return response.data as ICar[] | null;
    } catch (error) {
      return thunkErrorHandler(thunkAPI, error);
    }
  },
);

export const clickOnFavorite = createAsyncThunk(
  'cars/clickOnFavorite',
  async (data: { carId?: string; userId?: string }, thunkAPI) => {
    if (!data.carId || !data.userId) {
      void message.error('Не переданы carId или userId');
      return;
    }
    try {
      const response = await axios.put(`${backURL}/cars/clickOnFavorite`, {
        carId: data.carId,
        userId: data.userId,
      });
      // return response.data;
      return data.carId;
    } catch (error) {
      return thunkErrorHandler(thunkAPI, error);
    }
  },
);

export const clickOnCompare = createAsyncThunk(
  'cars/clickOnCompare',
  async (data: { carId?: string; userId?: string }, thunkAPI) => {
    try {
      const response = await axios.put(`${backURL}/cars/clickOnCompare`, {
        carId: data.carId,
        userId: data.userId,
      });
      // return response.data;
      return data.carId;
    } catch (error) {
      return thunkErrorHandler(thunkAPI, error);
    }
  },
);
