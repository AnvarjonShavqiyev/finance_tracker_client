import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@store/store";
import { useForm } from "react-hook-form";
import { ACTIONS, BudgetForm, ErrorMessage } from "@customTypes";
import { setBudgetDialog } from "@store/reducers/dialog.reducer";
import { ControlledSelect } from "@components/ControlledSelect";
import { useGetCategoriesQuery } from "@services/category";
import { CONFLICT_CODE, CURRENCY, currencyOptions, NOT_FOUND_CODE, SNACKBAR_ERROR } from "@constants";
import { useCreateBudgetMutation, useDeleteBudgetMutation, useEditBudgetMutation, useGetBudgetQuery } from "@services/budget";
import { enqueueSnackbar } from "notistack";
import { getSubmitButtonText } from "@helpers/getSubmitButtonText";
import { getBudgetBody, getBudgetTitle } from "./helpers";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";

import CategoryDialog from "../Category/CategoryDialog";
import Category from "../Category";
import ControlledTextField from "@components/ControlledTextField";

import styles from './Budgets.module.scss';

const BudgetDialog = () => {
    const {control, handleSubmit, reset} = useForm<BudgetForm>();
    const {budgetDialog: { isOpen, type, id }} = useAppSelector((root: RootState) => root.dialog);
    
    const {data} = useGetCategoriesQuery();
    const {data: budget} = useGetBudgetQuery(id ?? skipToken);

    const dispatch = useAppDispatch();
    const [createBudget] = useCreateBudgetMutation();
    const [editBudget] = useEditBudgetMutation();
    const [deleteBudget] = useDeleteBudgetMutation();

    useEffect(() => {
        if (type === ACTIONS.EDIT && budget) {
            const {limit, currency, categoryId} = budget;
            reset({limit, currency: currency as CURRENCY, categoryId});
        }
    }, [type, budget])

    const handleClose = () => {
        dispatch(setBudgetDialog({isOpen: false}));
    }

    const onSubmit = async (data: BudgetForm) => {
        try {
            switch (type) {
                case ACTIONS.CREATE:
                    await createBudget(getBudgetBody(data)).unwrap();
                    break;
                case ACTIONS.EDIT: 
                    await editBudget({id: id!, body: getBudgetBody(data)});
                    break;
                case ACTIONS.DELETE:
                    await deleteBudget(id!);
                    break;
                default:
                    break;
            }
            handleClose();
        } catch (error) {
            const {status, data: { message }} = error as ErrorMessage;
            if (status === CONFLICT_CODE || status === NOT_FOUND_CODE) {
                enqueueSnackbar(message, {variant: SNACKBAR_ERROR});
            }else{
                enqueueSnackbar("Something went wrong!", {variant: SNACKBAR_ERROR});
            }
        }
    }

    return <Dialog open={isOpen}>
        <DialogTitle>
            {getBudgetTitle(type as ACTIONS)}
        </DialogTitle>
        <DialogContent>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                {
                    type !== ACTIONS.DELETE ? 
                    <>
                        <ControlledTextField label="Amount" type="number" control={control} name="limit"/>
                        <ControlledSelect options={currencyOptions} label="Currency" control={control} name="currency"/>
                        <Box className={styles.category}>
                            <ControlledSelect options={data!} label="Category" control={control} name="categoryId"/>
                            <Category/>
                        </Box>
                    </>
                     : <Typography>Do you really want to delete this budget? If you delete, you can't restore it.</Typography>
                }
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit">{getSubmitButtonText(type as ACTIONS)}</Button>
                </DialogActions> 
            </form>
        </DialogContent>
        <CategoryDialog />
    </Dialog>
}

export default BudgetDialog;