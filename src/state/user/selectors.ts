import { RootState } from '@state';

export const selectUser = (state: RootState) => state.user.user;
