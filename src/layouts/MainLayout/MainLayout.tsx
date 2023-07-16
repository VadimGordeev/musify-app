import { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import { Sidebar } from '../../features/Sidebar/Sidebar';
import { LoginPage } from '../../pages/FirstPage/LoginPage';
import { Loader } from '../../shared/ui/Loader/Loader';
import { Player } from '../../shared/ui/Player/Player';
import { useAppDispatch, useAppSelector } from '../../store/store.types';
import { fetchUser } from '../../store/user/user.api';
import { loadingUser, selectUser } from '../../store/user/user.selector';

export const MainLayout = () => {
  const dispatch = useAppDispatch();

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
      <Sidebar />
      <Outlet />
      <Player />
    </div>
  ) : isLoading ? (
    <Loader />
  ) : (
    <LoginPage />
  );
};
