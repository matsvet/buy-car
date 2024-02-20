import { ActionCreatorWithPayload, AsyncThunkPayloadCreator } from '@reduxjs/toolkit';
import { AppThunk } from '@store';

import { AsyncThunkConfigType } from './types';

export const thunkErrorHandler = (
  thunkAPI: Parameters<
    AsyncThunkPayloadCreator<Record<string, unknown>, Record<string, unknown>, AsyncThunkConfigType>
  >[1],
  error: unknown,
) => {
  if (error instanceof Error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  } else {
    return thunkAPI.rejectWithValue({ error: 'Unknown error occurred' });
  }
};

export const dispatchErrorHandler = (
  dispatch: Parameters<AppThunk>[0],
  error: unknown,
  action: ActionCreatorWithPayload<string, string>,
) => {
  if (error instanceof Error) {
    dispatch(action(error.message));
  } else {
    dispatch(action('Unknown error occurred'));
  }
};
