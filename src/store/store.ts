import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from './api';
import { appMenuSlice } from './menu/menu.slice';
import { listenerMiddleware } from './store.listeners';
import { userSlice } from './user/user.slice';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [appMenuSlice.name]: appMenuSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      listenerMiddleware.middleware,
      baseApi.middleware
    ),
  devTools: import.meta.env.DEV
});
