import { Outlet } from 'react-router-dom';

import styles from './MainSection.module.scss';
import { Navbar } from './Navbar/Navbar';

export const MainSection = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Outlet />
    </div>
  );
};
