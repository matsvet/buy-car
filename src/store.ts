import { ThunkAction } from 'redux-thunk';

import { Action, configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from '../src/state';

const store = configureStore({
  reducer: rootReducer,
});

// TODO msv ??
// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('@state', () => {
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     const newRootReducer = require('@state').default;
//     store.replaceReducer(newRootReducer);
//   });
// }

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
