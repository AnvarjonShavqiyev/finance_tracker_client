import { Box, Button, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { ACTIONS } from "@customTypes";
import { TransactionDialog } from "./TransactionDialog";
import { useGetTransactionsQuery } from "@services/transaction";
import { BUTTON_ICON_SIZE, transactionTableColumns } from "@constants";
import { setTransactionDialog, setTransactionFiltersDialog } from "@store/reducers/dialog.reducer";
import { CiFilter } from "react-icons/ci";
import { TransactionFiltersDialog } from "./TransactionFilterDialog";

import CustomTable from "@components/Table";
import styles from './Transactions.module.scss';

const Transactions = () => {
  const dispatch = useAppDispatch();
  const {transactionFilters} = useAppSelector((state) => state.settings);
  
  const {data: transactions, isLoading} = useGetTransactionsQuery(transactionFilters);

  const handleOpen = () => {
    dispatch(setTransactionDialog({isOpen: true, type: ACTIONS.CREATE}));
  }

  const handleOpenFiltersDialog = () => {
    dispatch(setTransactionFiltersDialog({isOpen: true}));
  }

  return (
    <Box className={styles.container}>
      <Box className={styles.title}>
        <Typography>Transactions</Typography>
        <Box>
          <Tooltip placement="top" title="Filters">
            <IconButton onClick={handleOpenFiltersDialog}><CiFilter width={BUTTON_ICON_SIZE}/></IconButton>
          </Tooltip>
          <Button variant="contained" onClick={handleOpen}>Create transaction</Button>
        </Box>
      </Box>
      {
        !isLoading ? <CustomTable data={transactions} columns={transactionTableColumns(dispatch)}/> : <CircularProgress/>
      }
      <TransactionDialog />
      <TransactionFiltersDialog />
    </Box>
  )
}

export default Transactions