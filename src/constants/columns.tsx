import { Box, Button } from "@mui/material";
import { ACTIONS, Budget, Transaction } from "@customTypes";
import { setBudgetDialog, setTransactionDialog } from "@store/reducers/dialog.reducer";
import { transformDate } from "helpers/transformDate";
import { AppDispatch } from "@store/store";
import { HYPHEN } from "@constants";

import styles from './columns.module.scss';

export const transactionBaseColumns = [
  { header: "Description", accessor: (transaction: Transaction) => transaction.description },
  { header: "Amount", accessor: (transaction: Transaction) => `${transaction.amount} ${transaction.currency}` },
  { header: "Category", accessor: (transaction: Transaction) => transaction?.category?.name || HYPHEN },
  { header: "Type", accessor: (transaction: Transaction) => transaction.type },
  { header: "Date", accessor: (transaction: Transaction) => transformDate(transaction.date) },
];

export const transactionTableColumns = (dispatch: AppDispatch) => [
  ...transactionBaseColumns,
  {
    header: "Actions",
    accessor: ({id}: Transaction) => (
      <Box className={styles.buttonsWrapper}>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={() =>
            dispatch(
              setTransactionDialog({
                isOpen: true,
                type: ACTIONS.EDIT,
                id
              })
            )
          }
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() =>
            dispatch(
              setTransactionDialog({
                isOpen: true,
                type: ACTIONS.DELETE,
                id
              })
            )
          }
        >
          Delete
        </Button>
      </Box>
    ),
  },
];

export const budgetTableColumns = (dispatch: AppDispatch) => [
  {header: 'Limit', accessor: (budget: Budget) => budget.limit},
  {header: 'Currency', accessor: (budget: Budget) => budget.currency},
  {header: 'Usage', accessor: (budget: Budget) => budget.usage},
  {header: 'Category', accessor: (budget: Budget) => budget.category.name},
  {header: 'Completness', accessor: (budget: Budget) => `${budget.completeness}%`},
  {
    header: "Actions",
    accessor: ({id}: Budget) => (
      <Box className={styles.buttonsWrapper}>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={() =>
            dispatch(
              setBudgetDialog({
                isOpen: true,
                type: ACTIONS.EDIT,
                id
              })
            )
          }
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() =>
            dispatch(
              setBudgetDialog({
                isOpen: true,
                type: ACTIONS.DELETE,
                id
              })
            )
          }
        >
          Delete
        </Button>
      </Box>
    ),
  },
];
