import { Box, Typography } from "@mui/material";

import styles from './Hero.module.scss';
import AuthLink from "../../components/AuthLink";

const Hero = () => {
  return (
    <Box className={styles.container}>
            <Typography variant="h3">
                Simplify your expenses with Finance Tracker
            </Typography>
            <Typography variant="h4">
                The expense management solution built for Freelancers, Teams and Small Businesses
            </Typography>
            <AuthLink />
    </Box>
  )
}

export default Hero