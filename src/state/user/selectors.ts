import { RootState } from '@state';

export const selectUser = (state: RootState) => state.userReducer.user;
export const selectVerifyAuthLoading = (state: RootState) => state.userReducer.loading; // todo сделать отдельную загрузку именно при перезагрузке страницы
