import styles from './MainPage.module.scss';
import { Card } from '../../features/MainSection/Card/Card';

export const MainPage = () => {
  return (
    <div>
      <h3>Recently Played</h3>
      <div className={styles.card_container}>
        <Card />
        <Card />
      </div>
      <h3>Made For You</h3>
      <div className={styles.card_container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <h3>Made For You</h3>
      <div className={styles.card_container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
