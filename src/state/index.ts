import { combineReducers } from '@reduxjs/toolkit';
import carsReducer from '@state/cars/slice';
import filterReducer from '@state/filter/slice';
import userReducer from '@state/user/slice';

const rootReducer = combineReducers({
  userReducer,
  carsReducer,
  filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
