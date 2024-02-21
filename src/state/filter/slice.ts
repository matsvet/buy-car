import { IFilterState } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchFilter } from './thunks';
import { sliceCaseErrorHandler } from '@state/helpers';

const initialState: IFilterState = {
  filter: null,
  loading: false,
  error: null,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    clearFilter: (state) => {
      state.filter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.filter = action.payload;
      })
      .addCase(fetchFilter.rejected, (state, action) => {
        state.loading = false;
        sliceCaseErrorHandler(state, action);
      });
  },
});

export const { clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
