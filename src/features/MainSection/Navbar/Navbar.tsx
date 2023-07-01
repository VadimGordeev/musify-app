import styles from './Navbar.module.scss';
import { useAppSelector } from '../../../store/store.types';
import { selectUser } from '../../../store/user/user.selector';

export const Navbar = () => {
  const user = useAppSelector(selectUser);

  const imageUrl = user?.images[0];

  return (
    <div className={styles.container}>
      <div className={styles.user_container}>
        <h3>Hello, {user?.display_name}</h3>
        <img src={imageUrl?.url} />
      </div>
    </div>
  );
};
