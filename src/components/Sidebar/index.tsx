import { NavLink } from 'react-router-dom';
import { EMPTY_STRING, HIDE_BAR_NAME_SIZE, SIDEBAR_ROUTES } from '@constants';
import { useScreenData } from '@hooks/useScreenData';

import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const {width} = useScreenData();

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
          {route.icon}
          {!!(width >= HIDE_BAR_NAME_SIZE) && route.title}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
