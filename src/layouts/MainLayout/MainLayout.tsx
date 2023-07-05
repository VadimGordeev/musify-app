import { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import { Player } from '../../features/Player/Player';
import { Sidebar } from '../../features/Sidebar/Sidebar';
import { LoginPage } from '../../pages/FirstPage/LoginPage';
import { Loader } from '../../shared/ui/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../store/store.types';
import { fetchUser } from '../../store/user/user.api';
import { loadingUser, selectUser } from '../../store/user/user.selector';

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
  const isLoading = useAppSelector(loadingUser);

  return user ? (
    <div className={styles.container}>
      <Sidebar
        isOpen={isOpen}
        onClick={toggleMenu}
      />
      <Outlet />
      <Player />
    </div>
  ) : isLoading ? (
    <Loader />
  ) : (
    <LoginPage />
  );
};
