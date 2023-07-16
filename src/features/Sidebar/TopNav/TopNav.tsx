import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '~/assets/icons/home.svg';
import { ReactComponent as SearchIcon } from '~/assets/icons/search.svg';

import styles from './TopNav.module.scss';
import { MenuState } from '../../../store/menu/menu.constants';
import { menuActions } from '../../../store/menu/menu.slice';
import { useAppDispatch } from '../../../store/store.types';
import { MenuButton } from '../../MainSection/Navbar/MenuButton/MenuButton';

export const TopNav = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.container}>
      <MenuButton />
      <NavLink
        to="/"
        className={({ isActive }) =>
          classNames({ [styles.active]: isActive, [styles.link]: true })
        }
        onClick={() => dispatch(menuActions.changeState(MenuState.Close))}
      >
        <HomeIcon />
        Home
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          classNames({ [styles.active]: isActive, [styles.link]: true })
        }
        onClick={() => dispatch(menuActions.changeState(MenuState.Close))}
      >
        <SearchIcon />
        Search
      </NavLink>
    </div>
  );
};
