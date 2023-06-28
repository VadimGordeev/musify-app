import { type RootState } from '~/store/store.types';

import { STATUS } from '../../entities/status';

export const selectUser = (state: RootState) =>
  state.user.currentUser.status === STATUS.SUCCESS
    ? state.user.currentUser.data
    : null;
