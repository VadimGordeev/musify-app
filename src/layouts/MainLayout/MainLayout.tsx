import { useState } from 'react';

import styles from './MainLayout.module.scss';
import { MainSection } from '../../features/MainSection/MainSection';
import { Sidebar } from '../../features/Sidebar/Sidebar';

export const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((hasBeenOpened) => !hasBeenOpened);
  };
  return (
    <div className={styles.container}>
      <Sidebar
        isOpen={isOpen}
        onClick={toggleMenu}
      />
      <MainSection />
    </div>
  );
};
