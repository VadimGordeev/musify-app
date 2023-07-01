import { NavLink } from 'react-router-dom';

import { ReactComponent as HomeIcon } from '~/assets/icons/home.svg';
import { ReactComponent as SearchIcon } from '~/assets/icons/search.svg';

import styles from './TopNav.module.scss';

export const TopNav = () => {
  return (
    <div className={styles.container}>
      <NavLink to="/">
        <HomeIcon />
        Home
      </NavLink>
      <NavLink to="/search">
        <SearchIcon />
        Search
      </NavLink>
    </div>
  );
};
