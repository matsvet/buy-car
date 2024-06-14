import { RootState } from '@state';

export interface AsyncThunkConfigType {
  state: RootState;
  rejectValue: { error: string };
}
