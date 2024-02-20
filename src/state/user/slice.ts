import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signInWithGoogle, signOut } from './thunks';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(signInWithGoogle.fulfilled, (state, action: PayloadAction<any>) => {
        // TODO
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false;
        // @ts-expect-error
        state.error = action.payload; // TODO
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
