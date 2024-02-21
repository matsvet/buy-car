import { RootState } from '@state';

export const selectCarsReducer = (state: RootState) => state.carsReducer;
export const selectCars = (state: RootState) => state.carsReducer.cars;
export const selectIsCarsLoading = (state: RootState) => state.carsReducer.loading;
