import { type MenuState } from './menu.constants';

export type MenuStates = (typeof MenuState)[keyof typeof MenuState];

export type BurgerState = {
  state: MenuStates;
};
