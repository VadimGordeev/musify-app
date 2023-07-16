import { ReactComponent as User } from '~/assets/icons/user.svg';

import { MenuButton } from './MenuButton/MenuButton';
import styles from './Navbar.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../store/store.types';
import { selectUser } from '../../../store/user/user.selector';
import { userActions } from '../../../store/user/user.slice';

export const Navbar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      <MenuButton />
      <div className={styles.user_container}>
        <h3>Hello, {user?.display_name}</h3>
        {user && user?.images.length > 0 ? (
          <img
            src={user?.images[0].url}
            className={styles.user_image}
          />
        ) : (
          <User className={styles.user_image} />
        )}

        <Button
          appearance="primary"
          onClick={() => {
            dispatch(userActions.logout());
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};
