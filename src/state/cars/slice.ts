import { ICar, ICarsState } from './types';
import { clickOnCompare, clickOnFavorite, fetchCars, fetchCompared, fetchFavorites } from './thunks';
import { createSlice } from '@reduxjs/toolkit';
import { sliceCaseErrorHandler } from '@state/helpers';

const initialState: ICarsState = {
  cars: null,
  loading: false,
  loadingFavorites: false,
  loadingCompared: false,
  error: null,
  favoriteCars: null,
  comparedCars: null,
  totalItems: null,
  currentPage: 1,
  totalPages: null,
  pageSize: 10,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    clearCars: (state) => {
      state.cars = null;
      state.favoriteCars = null;
      state.comparedCars = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, { payload }) => {
        state.loading = false;
        // state.cars = payload?.cars ?? null;
        state.totalItems = payload?.totalItems ?? null;
        state.currentPage = payload?.currentPage ?? 1;
        state.totalItems = payload?.totalItems ?? null;
        state.pageSize = payload?.pageSize ?? 10;

        state.cars =
          state.currentPage === 1 ? payload?.cars ?? null : [...(state.cars ?? []), ...(payload?.cars ?? [])];
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

        state.comparedCars =
          state.comparedCars?.map((car) => {
            if (car.id === action.payload) {
              return { ...car, isFavorite: !car.isFavorite };
            } else {
              return car;
            }
          }) ?? null;

        state.favoriteCars = state.favoriteCars?.filter((car) => car.id !== action.payload) ?? null;
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

        state.favoriteCars =
          state.favoriteCars?.map((car) => {
            if (car.id === action.payload) {
              return { ...car, isCompared: !car.isCompared };
            } else {
              return car;
            }
          }) ?? null;

        state.comparedCars = state.comparedCars?.filter((car) => car.id !== action.payload) ?? null;
      })
      .addCase(clickOnCompare.rejected, (state, action) => {
        sliceCaseErrorHandler(state, action);
      })

      .addCase(fetchFavorites.pending, (state) => {
        state.loadingFavorites = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loadingFavorites = false;
        state.favoriteCars = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loadingFavorites = false;
        sliceCaseErrorHandler(state, action);
      })

      .addCase(fetchCompared.pending, (state) => {
        state.loadingCompared = true;
      })
      .addCase(fetchCompared.fulfilled, (state, action) => {
        state.loadingCompared = false;
        state.comparedCars = action.payload;
      })
      .addCase(fetchCompared.rejected, (state, action) => {
        state.loadingCompared = false;
        sliceCaseErrorHandler(state, action);
      });
  },
});

export const { clearCars } = carsSlice.actions;

export default carsSlice.reducer;
