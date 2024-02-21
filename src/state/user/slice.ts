import { IUserState } from './types';
import { createSlice } from '@reduxjs/toolkit';
import { signInWithGoogle, signOut, verifyAuthState } from './thunks';
import { sliceCaseErrorHandler } from '@state/helpers';

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        sliceCaseErrorHandler(state, action);
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(verifyAuthState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(verifyAuthState.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        sliceCaseErrorHandler(state, action);
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
