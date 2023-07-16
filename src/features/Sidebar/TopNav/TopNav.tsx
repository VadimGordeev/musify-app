import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '~/assets/icons/home.svg';
import { ReactComponent as SearchIcon } from '~/assets/icons/search.svg';

import styles from './TopNav.module.scss';
import { MenuButton } from '../../MainSection/Navbar/MenuButton';

export const TopNav = () => {
  return (
    <div className={styles.container}>
      <MenuButton />
      <NavLink
        to="/"
        className={({ isActive }) =>
          classNames({ [styles.active]: isActive, [styles.link]: true })
        }
      >
        <HomeIcon />
        Home
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) =>
          classNames({ [styles.active]: isActive, [styles.link]: true })
        }
      >
        <SearchIcon />
        Search
      </NavLink>
    </div>
  );
};
