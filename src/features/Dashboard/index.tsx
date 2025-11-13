import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useScreenData } from "@hooks/useScreenData";

import Sidebar from "@components/Sidebar";
import styles from './Dashboard.module.scss';

const Dashboard = () => {
  const { isMobile } = useScreenData();

  return (
    <Box className={styles.container}>
      {!isMobile && <Sidebar />}
      <Box className={styles.outletWrapper}>
        <Box className={styles.outlet}>
          <Outlet />
        </Box>
      </Box>
      {!!isMobile && <Sidebar />}
    </Box>
  );
};

export default Dashboard;
