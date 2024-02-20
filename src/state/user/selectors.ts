import { RootState } from '@state';

export const selectUser = (state: RootState) => state.user.user;
export const selectVerifyAuthLoading = (state: RootState) => state.user.loading; // todo сделать отдельную загрузку именно при перезагрузке страницы
