import { ReactComponent as HomeIcon } from '~/assets/icons/home.svg';
import { ReactComponent as SearchIcon } from '~/assets/icons/search.svg';

import styles from './TopNav.module.scss';
import { Button } from '../../../shared/ui/Button/Button';

export const TopNav = () => {
  return (
    <div className={styles.container}>
      <Button
        icon={<HomeIcon />}
        className={styles.link}
      >
        Home
      </Button>
      <Button
        icon={<SearchIcon />}
        className={styles.link}
      >
        Search
      </Button>
    </div>
  );
};
