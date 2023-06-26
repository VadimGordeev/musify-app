import { Library } from './Library/Library';
import styles from './Sidebar.module.scss';
import { TopNav } from './TopNav/TopNav';

export const Sidebar = ({
  isOpen,
  onClick
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={styles.container}
      data-open={isOpen}
    >
      <TopNav />
      <Library onClick={onClick} />
    </div>
  );
};
