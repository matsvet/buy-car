import { combineReducers } from '@reduxjs/toolkit';
// circular definition: тип RootState используется в user/thunks в строке 15 const state = thunkAPI.getState() as RootState :
import userReducer from '@state/user/slice';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
