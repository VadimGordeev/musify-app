import { configureStore } from '@reduxjs/toolkit';

import { listenerMiddleware } from './store.listeners';
import { userSlice } from './user/user.slice';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
  devTools: import.meta.env.DEV
});
