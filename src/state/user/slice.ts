import { IUser, IUserState } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { signInWithGoogle, signOut, verifyAuthState } from './thunks';

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
        if (action.payload) {
          const payload = action.payload as { error: string };
          state.error = payload.error;
        } else {
          state.error = action.error.message ? action.error.message : 'Unknown error occurred';
        }
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
        if (action.payload) {
          const payload = action.payload as { error: string };
          state.error = payload.error;
        } else {
          state.error = action.error.message ? action.error.message : 'Unknown error occurred';
        }
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
