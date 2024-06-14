import { CaseReducer } from '@reduxjs/toolkit';

export interface IUserState {
  loading: boolean;
  error: string | null;
  user: IUser | null;
}

export interface IUser {
  email: string | null;
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

export interface ReducersType {
  clearUser: CaseReducer<IUserState>;
  // clearUser: () => void;
}
