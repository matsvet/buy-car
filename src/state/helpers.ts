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

// todo type
export const sliceCaseErrorHandler = (state, action) => {
  if (action.payload) {
    // Если в payload есть данные, предполагаем, что это объект с полем error
    const payload = action.payload as { error: string };
    state.error = payload.error;
  } else {
    // Если payload нет, используем сообщение из action.error или задаем сообщение по умолчанию
    state.error = action.error.message ? action.error.message : 'Unknown error occurred';
  }
};
