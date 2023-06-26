import { Card } from './Card/Card';
import styles from './MainSection.module.scss';
import { Navbar } from './Navbar/Navbar';

export const MainSection = () => {
  return (
    <div className={styles.container}>
      <Navbar />
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
