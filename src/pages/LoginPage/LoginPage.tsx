import { useLocation } from 'react-router-dom';

import styles from './LoginPage.module.scss';
import { authSpotify } from '../../api/login';
import { Button } from '../../shared/ui/Button/Button';

export const LoginPage = () => {
  const location = useLocation();
  return (
    <div className={styles.container}>
      <h1>Welcome to Musify</h1>
      <Button
        className={styles.login}
        onClick={() => {
          authSpotify();
        }}
        disabled={!!location.hash}
      >
        Login with Spotify
      </Button>
    </div>
  );
};
