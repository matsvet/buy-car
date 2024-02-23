import { ICarsState } from './types';
import { clickOnCompare, clickOnFavorite, fetchCars } from './thunks';
import { createSlice } from '@reduxjs/toolkit';
import { sliceCaseErrorHandler } from '@state/helpers';

const initialState: ICarsState = {
  cars: null,
  loading: false,
  error: null,
  favoriteCars: null,
  comparedCars: null,
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
      })

      .addCase(clickOnFavorite.fulfilled, (state, action) => {
        state.cars =
          state.cars?.map((car) => {
            if (car.id === action.payload) {
              return { ...car, isFavorite: !car.isFavorite };
            } else {
              return car;
            }
          }) ?? null;
      })
      .addCase(clickOnFavorite.rejected, (state, action) => {
        sliceCaseErrorHandler(state, action);
      })

      .addCase(clickOnCompare.fulfilled, (state, action) => {
        state.cars =
          state.cars?.map((car) => {
            if (car.id === action.payload) {
              return { ...car, isCompared: !car.isCompared };
            } else {
              return car;
            }
          }) ?? null;
      })
      .addCase(clickOnCompare.rejected, (state, action) => {
        sliceCaseErrorHandler(state, action);
      });
  },
});

export const { clearCars } = carsSlice.actions;

export default carsSlice.reducer;
