import styles from './Navbar.module.scss';
import { Button } from '../../../shared/ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../store/store.types';
import { selectUser } from '../../../store/user/user.selector';
import { userActions } from '../../../store/user/user.slice';

export const Navbar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const imageUrl = user?.images[0];

  return (
    <div className={styles.container}>
      <div className={styles.user_container}>
        <h3>Hello, {user?.display_name}</h3>
        <img src={imageUrl?.url} />
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
