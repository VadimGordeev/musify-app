import { ReactComponent as BurgerIcon } from '~/assets/icons/burger.svg';
import { ReactComponent as CloseIcon } from '~/assets/icons/close.svg';

import { Button } from '../../../shared/ui/Button/Button';
import { MenuState } from '../../../store/menu/menu.constants';
import { changeAppMenu } from '../../../store/menu/menu.selector';
import { menuActions } from '../../../store/menu/menu.slice';
import { useAppDispatch, useAppSelector } from '../../../store/store.types';

export const MenuButton = () => {
  const menuState = useAppSelector(changeAppMenu);
  const dispatch = useAppDispatch();
  return (
    <Button
      icon={menuState === MenuState.Close ? <BurgerIcon /> : <CloseIcon />}
      onClick={() =>
        menuState === MenuState.Close
          ? dispatch(menuActions.changeState(MenuState.Open))
          : dispatch(menuActions.changeState(MenuState.Close))
      }
      appearance="secondary"
    />
  );
};
