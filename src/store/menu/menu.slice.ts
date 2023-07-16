import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MenuState } from './menu.constants';
import { type BurgerState, type MenuStates } from './menu.types';
import { startAppListening } from '../store.types';

const getInitialState = (): BurgerState => ({
  state: MenuState.Close
});

export const appMenuSlice = createSlice({
  name: 'menu',
  initialState: getInitialState,
  reducers: {
    changeState: (state, action: PayloadAction<MenuStates>) => {
      state.state = action.payload;
    }
  }
});

startAppListening({
  matcher: appMenuSlice.actions.changeState.match,
  effect: ({ payload }) => {
    const sidebar = document.querySelector('#sidebar') as HTMLElement;
    if (sidebar) {
      sidebar.dataset.open = payload === MenuState.Open ? 'true' : 'false';
    }
  }
});

export const { actions: menuActions } = appMenuSlice;
