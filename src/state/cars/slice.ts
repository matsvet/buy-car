import { ICarsState } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchCars } from './thunks';
import { sliceCaseErrorHandler } from '@state/helpers';

const initialState: ICarsState = {
  cars: null,
  loading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearCars: (state) => {
      state.cars = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        sliceCaseErrorHandler(state, action);
      });
  },
});

export const { clearCars } = carsSlice.actions;

export default carsSlice.reducer;
