import { useNavigate } from 'react-router-dom';

import styles from './FirstPage.module.scss';
import { authSpotify } from '../../api/login';
import { Button } from '../../shared/ui/Button/Button';

export const FirstPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Welcome to Spotify</h1>
      <Button
        className={styles.login}
        onClick={authSpotify}
      >
        Login
      </Button>
      <Button onClick={() => navigate('/loader')}>Test loader</Button>
    </div>
  );
};
