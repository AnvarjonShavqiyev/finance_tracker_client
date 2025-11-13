import { Box, CircularProgress } from "@mui/material";
import { Suspense } from "react";

import styles from './helpers.module.scss';

export const getRouteElement = (element: React.ReactNode) => {
    return <Suspense fallback={
        <Box className={styles.spinnerWrapper}>
            <CircularProgress/>
        </Box>
    }>{element}</Suspense>
}