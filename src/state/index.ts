import { combineReducers } from '@reduxjs/toolkit';
import carsReducer from '@state/cars/slice';
import userReducer from '@state/user/slice';

const rootReducer = combineReducers({
  userReducer,
  carsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
