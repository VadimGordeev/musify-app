import styles from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <div>
      <h3>Recently Played</h3>
      <div className={styles.card_container}></div>
      <h3>Made For You</h3>
      <div className={styles.card_container}></div>
      <h3>Made For You</h3>
      <div className={styles.card_container}></div>
    </div>
  );
};
