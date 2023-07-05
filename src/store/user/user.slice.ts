import { createSlice } from '@reduxjs/toolkit';

import { fetchUser } from './user.api';
import { type UserSlice } from './user.types';
import { STATUS } from '../../entities/status';
import { startAppListening } from '../store.types';

const getInitialState = (): UserSlice => {
  return {
    currentUser: { status: STATUS.IDLE }
  };
};

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState,
  reducers: {
    logout: (state) => {
      state.currentUser = { status: STATUS.IDLE };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.currentUser = { status: STATUS.LOADING, isLoading: true };
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.currentUser = { status: STATUS.SUCCESS, data: action.payload };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      if (action.error.name === 'AbortError') {
        return;
      }

      state.currentUser = {
        status: STATUS.ERROR,
        error: action.error.message || 'Unexpected error'
      };
    });
  }
});

startAppListening({
  matcher: userSlice.actions.logout.match,
  effect: () => {
    localStorage.removeItem('spotify/access-token');
  }
});

export const { actions: userActions } = userSlice;
