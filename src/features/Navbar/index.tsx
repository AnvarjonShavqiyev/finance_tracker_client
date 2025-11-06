import { Box, Typography } from "@mui/material";

import AuthLink from "../../components/AuthLink";

import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <Box className={styles.navbar}>
        <Typography variant="h4">
            Finance Tracker
        </Typography>
        <AuthLink />
    </Box>
  )
}

export default Navbar;