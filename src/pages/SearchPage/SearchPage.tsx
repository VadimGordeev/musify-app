import styles from './SearchPage.module.scss';
import { Search } from '../../features/Search/Search';

export const SearchPage = () => {
  return (
    <div className={styles.container}>
      <Search />
    </div>
  );
};
