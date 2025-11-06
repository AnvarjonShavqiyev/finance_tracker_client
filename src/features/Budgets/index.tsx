import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useGetBudgetsQuery } from "@services/budget";
import { budgetTableColumns } from "@constants";
import { useAppDispatch } from "@hooks/reduxHooks";
import { setBudgetDialog } from "@store/reducers/dialog.reducer";
import { ACTIONS } from "@customTypes";

import CustomTable from "@components/Table";
import BudgetDialog from "./BudgetDialog";

import styles from './Budgets.module.scss';

const Budgets = () => {
  const {data, isLoading} = useGetBudgetsQuery();
  const dispatch = useAppDispatch();

  const handleOpen = () => {
    dispatch(setBudgetDialog({isOpen: true, type: ACTIONS.CREATE}))
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.title}>
        <Typography>Budgets</Typography>
        <Button variant="contained" onClick={handleOpen}>Create budget</Button>
      </Box>
      {
        !isLoading ? <CustomTable data={data} columns={budgetTableColumns(dispatch)}/> : <CircularProgress />
      }
      <BudgetDialog />
    </Box>
  )
}

export default Budgets;