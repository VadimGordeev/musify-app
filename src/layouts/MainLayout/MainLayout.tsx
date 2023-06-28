import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import { Sidebar } from '../../features/Sidebar/Sidebar';
import { FirstPage } from '../../pages/FirstPage/FirstPage';
import { useAppDispatch, useAppSelector } from '../../store/store.types';
import { selectUser } from '../../store/user/user.selector';
import { fetchUser } from '../../store/user/user.api';

export const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };
  useEffect(() => {
    const promise = dispatch(fetchUser());

    return () => {
      promise.abort();
    };
  }, [dispatch]);

  const user = useAppSelector(selectUser);
  console.log(user);

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
