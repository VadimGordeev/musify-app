import { NavLink } from 'react-router-dom';

import styles from './CategoryCard.module.scss';
import { type Category } from '../../../entities/spotifyTypes';

export const CategoryCard = ({ category }: { category: Category }) => {
  return (
    <NavLink
      to={`/playlist/${category.id}`}
      className={styles.container}
      style={{ backgroundImage: `url(${category.icons[0].url})` }}
    >
      <h3>{category.name}</h3>
    </NavLink>
  );
};
