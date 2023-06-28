import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import { Sidebar } from '../../features/Sidebar/Sidebar';
import { FirstPage } from '../../pages/FirstPage/FirstPage';

export const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };

  const user: null | string = '';

  return user ? (
    <div className={styles.container}>
      <Sidebar
        isOpen={isOpen}
        onClick={toggleMenu}
      />
      <Outlet />
    </div>
  ) : (
    <FirstPage />
  );
};
