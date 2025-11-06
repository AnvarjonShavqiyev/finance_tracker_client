import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Sidebar from "@components/Sidebar";

import styles from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <Box className={styles.container}>
      <Sidebar />
      <Box className={styles.outletWrapper}>
        <Box className={styles.outlet}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
