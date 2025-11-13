import { Box } from "@mui/material";

import Navbar from "../Navbar";
import Hero from "../Hero/Hero";

import styles from './Home.module.scss';

const Home = () => {
  return (
    <Box className={styles.homeWrapper}>
      <Box className={styles.container}>
          <Navbar />
          <Hero />  
      </Box>
    </Box>
  )
}

export default Home