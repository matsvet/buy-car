import { RootState } from '@state';

export type AsyncThunkConfigType = {
  state: RootState;
  rejectValue: { error: string };
};