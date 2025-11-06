import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { RootState } from "@store/store";
import { useForm } from "react-hook-form";
import { ACTIONS, CategoryForm, ErrorMessage } from "@customTypes";
import { useCreateCategoryMutation, useDeleteCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from "@services/category";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { getSubmitButtonText } from "@helpers/getSubmitButtonText";
import { getCategoryTitle } from "./helpers";
import { useSnackbar } from "notistack";
import { CONFLICT_CODE, EMPTY_STRING, SNACKBAR_ERROR } from "@constants";
import { setCategoryDialog } from "@store/reducers/dialog.reducer";

import ControlledTextField from "@components/ControlledTextField";

import styles from './Category.module.scss';

const CategoryDialog = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { categoryDialog: { isOpen, id, type } } = useAppSelector((state: RootState) => state.dialog);
    const { control, handleSubmit, reset } = useForm<CategoryForm>();
    const { data } = useGetCategoryQuery(id ?? skipToken);
    
    const dispatch = useAppDispatch();
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    useEffect(() => {
        if (type === ACTIONS.EDIT && data?.payload) {
            reset(data.payload);
        }
    }, [type, data]);

    const handleClose = () => {
        reset({ name: EMPTY_STRING });
        dispatch(setCategoryDialog({ isOpen: false }));
    };

    const onSubmit = async (data: CategoryForm) => {
        try {
            switch (type) {
                case ACTIONS.CREATE:
                    await createCategory(data).unwrap();
                    break;
                case ACTIONS.EDIT:
                    await updateCategory({ id: id!, body: data }).unwrap();
                    break;
                case ACTIONS.DELETE:
                    await deleteCategory(id!).unwrap();
                    break;
                default:
                    break;
            }
            handleClose();
        } catch (error) {
            const errorMessage = error as ErrorMessage;
            if (errorMessage.status === CONFLICT_CODE) {
                enqueueSnackbar(errorMessage.data.message, { variant: SNACKBAR_ERROR})
            } else {
                enqueueSnackbar("Something went wrong!", { variant: SNACKBAR_ERROR})
            }
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>
                {getCategoryTitle(type as ACTIONS)}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
                    {
                        (type === ACTIONS.CREATE || type === ACTIONS.EDIT) ? 
                        <ControlledTextField control={control} name="name" label="Name" /> :
                        <Typography variant='body2'>If you delete this category, the data cannot be restored.</Typography>
                    }
                    <DialogActions>
                        <Button onClick={handleClose} variant="outlined">Cancel</Button>
                        <Button type="submit" variant="contained">
                            {getSubmitButtonText(type as ACTIONS)}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CategoryDialog;
