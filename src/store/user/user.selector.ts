import { type RootState } from '~/store/store.types';

import { STATUS } from '../../entities/status';

export const selectUser = (state: RootState) =>
  state.user.currentUser.status === STATUS.SUCCESS
    ? state.user.currentUser.data
    : null;

export const loadingUser = (state: RootState) =>
  state.user.currentUser.status === STATUS.LOADING
    ? state.user.currentUser.isLoading
    : null;
