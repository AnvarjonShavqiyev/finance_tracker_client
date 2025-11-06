import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../store/store';
import { useForm, useWatch } from 'react-hook-form';
import { ACTIONS, TransactionForm } from '../../types';
import { ControlledSelect } from '../../components/ControlledSelect';
import { CURRENCY, currencyOptions, defaultTransactionValues, MULTILINE_COUNT, repeatIntervalOptions, TRANSACTION_TYPES, transactionOptions } from '../../constants';
import { Box, Button, DialogActions, Typography } from '@mui/material';
import { useGetCategoriesQuery } from '../../services/category';
import { useCreateTransactionMutation, useDeleteTransactionMutation, useGetTransactionQuery, useUpdateTransactionMutation } from '../../services/transaction';
import { useGetUsersQuery } from '../../services/users';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect } from 'react';
import { getTransactionBody, getTransactionTitle } from './helpers';
import { getSubmitButtonText } from '../../helpers/getSubmitButtonText';
import { setTransactionDialog } from '../../store/reducers/dialog.reducer';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ControlledTextField from '../../components/ControlledTextField';
import Category from '../Category';
import CategoryDialog from '../Category/CategoryDialog';

import styles from './Transactions.module.scss';

export const TransactionDialog = () => {
  const { transactionDialog: {isOpen, id, type} } = useAppSelector((state: RootState) => state.dialog);
  const { control, handleSubmit, reset } = useForm<TransactionForm>({
    defaultValues: defaultTransactionValues
  })

  const dispatch = useAppDispatch();
  const categoryId = useWatch({control, name: "categoryId"})
  const transactionType = useWatch({control, name: "type"})

  const {data: categoryOptions} = useGetCategoriesQuery();
  const {data: userOptions} = useGetUsersQuery();
  const {data: transaction} = useGetTransactionQuery(id ?? skipToken);
  const [createTransaction, {isLoading: isCreateLoading}] = useCreateTransactionMutation();
  const [updateTransaction, {isLoading: isUpdateLoading}] = useUpdateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  useEffect(() => {
    if (type === ACTIONS.EDIT && transaction) {
      reset({
        ...transaction,
        currency: transaction.currency as CURRENCY,
      })
    }
  }, [type, transaction])

  const handleClose = () => {
    dispatch(setTransactionDialog({ isOpen: false }))
    reset(defaultTransactionValues)
  }

  const onSubmit = async (data: TransactionForm) => {
    switch (type) {
      case ACTIONS.CREATE:
        await createTransaction(getTransactionBody(data));
        break;
      case ACTIONS.EDIT:
        await updateTransaction({id: id!, body: getTransactionBody(data)})
        break;
      case ACTIONS.DELETE:
        await deleteTransaction(id!)
    }
    handleClose();
  };


  return (
      <Dialog
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle>
          {getTransactionTitle(type as ACTIONS)}
        </DialogTitle>
        <DialogContent>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {
              (type === ACTIONS.CREATE || type === ACTIONS.EDIT) ? 
                <>
                  <ControlledTextField control={control} name="amount" label="Amount" type="number" />
                  <ControlledSelect control={control} name="currency" label="Currency" options={currencyOptions} />
                  <ControlledSelect control={control} name="type" label="Type" options={transactionOptions} />
                  {
                    transactionType !== TRANSACTION_TYPES.INCOME && 
                    (
                      <Box className={styles.categoryWrapper}>
                        <ControlledSelect control={control} name="categoryId" label="Category" options={categoryOptions!} />
                        <Category id={categoryId} />
                      </Box>
                    )
                  }
                  <ControlledSelect control={control} name="accountId" label="Account" options={userOptions!} />
                  <ControlledSelect control={control} name="repeatInterval" label="Repeat at" options={repeatIntervalOptions} />
                  <ControlledTextField control={control} name="description" label="Description" rows={MULTILINE_COUNT} />
                </>
                  : 
                <Typography variant='body2'>If you delete this transaction, the data cannot be restored.</Typography>
            }
            <DialogActions>
              <Button onClick={handleClose} variant="outlined">Cancel</Button>
              <Button loading={isCreateLoading || isUpdateLoading} type='submit' variant="contained">{getSubmitButtonText(type as ACTIONS)}</Button>
            </DialogActions>
          </form>
        </DialogContent>
        <CategoryDialog />
      </Dialog>
  );
}
