import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dialog } from "../../types/common";
import { defaultDialog } from "../../constants";

interface categoryState {
    categoryDialog: Dialog,
    transactionDialog: Dialog,
    budgetDialog: Dialog,
    reportsAndSettingsDialog: Dialog,
    transactionFiltersDialog: Dialog,
}

const initialState: categoryState = {
    categoryDialog: defaultDialog,
    transactionDialog: defaultDialog,
    budgetDialog: defaultDialog,
    reportsAndSettingsDialog: defaultDialog,
    transactionFiltersDialog: defaultDialog
}

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        setCategoryDialog: (state, action: PayloadAction<Dialog>) => {
            state.categoryDialog = action.payload;
        },
        setTransactionDialog: (state, action: PayloadAction<Dialog>) => {
            state.transactionDialog = action.payload;
        },
        setBudgetDialog: (state, action: PayloadAction<Dialog>) => {
            state.budgetDialog = action.payload;
        },
        setReportsAndSettingsDialog: (state, action: PayloadAction<Dialog>) => {
            state.reportsAndSettingsDialog = action.payload;
        },
        setTransactionFiltersDialog: (state, action: PayloadAction<Dialog>) => {
            state.transactionFiltersDialog = action.payload;
        }
    }
})

export const { 
    setCategoryDialog, 
    setTransactionDialog,
    setBudgetDialog,
    setReportsAndSettingsDialog,
    setTransactionFiltersDialog
} = dialogSlice.actions;
export default dialogSlice.reducer;