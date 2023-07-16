import { PlaylistsBar } from './PlaylistsBar/PlaylistsBar';
import styles from './Sidebar.module.scss';
import { TopNav } from './TopNav/TopNav';

export const Sidebar = () => {
  return (
    <div
      className={styles.container}
      id="sidebar"
    >
      <TopNav />
      <PlaylistsBar />
    </div>
  );
};
