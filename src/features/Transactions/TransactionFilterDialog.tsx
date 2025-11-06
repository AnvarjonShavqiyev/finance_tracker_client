import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { TransactionFiltersForm } from "../../types"
import { ControlledDatePicker } from "../../components/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useGetCategoriesQuery } from "../../services/category"
import { ControlledSelect } from "../../components/ControlledSelect"
import { amountTypeOptions, defaultTransactionFilters } from "../../constants"
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks"
import { setTransactionFiltersDialog } from "../../store/reducers/dialog.reducer"
import { setTransactionFilters } from "../../store/reducers/settings.reducer";

import ControlledTextField from "../../components/ControlledTextField"
import styles from './Transactions.module.scss';

export const TransactionFiltersDialog = () => {
    const dispatch = useAppDispatch();
    
    const {isOpen} = useAppSelector((state) => state.dialog.transactionFiltersDialog);

    const {control, handleSubmit, reset} = useForm<TransactionFiltersForm>({
        defaultValues: defaultTransactionFilters
    })
    const {data: categoryOptions} = useGetCategoriesQuery();

    const handleClose = () => {
        dispatch(setTransactionFiltersDialog({isOpen: false}));
    }

    const handleReset = () => {
        reset(defaultTransactionFilters);
        dispatch(setTransactionFilters(defaultTransactionFilters));
    }

    const onSubmit = (data: TransactionFiltersForm) => {
        dispatch(setTransactionFilters(data));
        handleClose();
    }

    return <Dialog open={isOpen}>
        <DialogTitle>Filters</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.settingsWrapper}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                   <Box className={styles.datePickers}>
                        <ControlledDatePicker control={control} name="fromDate" label="From" />
                        <ControlledDatePicker control={control} name="toDate" label="To" />
                   </Box>
                </LocalizationProvider>
                <ControlledSelect options={categoryOptions!} control={control} name="categoryId" label="Category" />
                <Box className={styles.amountFilterWrapper}>
                    <Typography>Amount</Typography>
                    <ControlledSelect options={amountTypeOptions} control={control} name="amountType" />
                    <ControlledTextField type="number" control={control} name="amount" />
                </Box>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleReset}>Reset</Button>
                    <Button variant="contained" type="submit">Save</Button>
                </DialogActions>
            </form>
        </DialogContent>
    </Dialog> 
}