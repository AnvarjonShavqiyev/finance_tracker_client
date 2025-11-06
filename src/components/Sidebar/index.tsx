import { NavLink } from 'react-router-dom';
import { EMPTY_STRING, SIDEBAR_ROUTES } from '@constants';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside className={styles.container}>
      {SIDEBAR_ROUTES.map((route) => (
        <NavLink
          key={route.url}
          to={route.url}
          className={({ isActive }) =>
            isActive ? `${styles.active}` : EMPTY_STRING
          }
        >
          <span>{route.title}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
