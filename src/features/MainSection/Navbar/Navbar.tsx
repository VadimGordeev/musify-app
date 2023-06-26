import styles from './Navbar.module.scss';
import { Button } from '../../../shared/ui/Button/Button';

export const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.btn_container}>
        <Button className={styles.auth}>Sign Up</Button>
        <Button className={styles.auth}>Log In</Button>
      </div>
    </div>
  );
};
