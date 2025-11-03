import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DownloadReportsAndSettingsForm, TransactionFiltersForm } from "../../types";
import { defaultReportSettings, defaultTransactionFilters } from "../../constants";

interface SettingsState {
    reportSettings: DownloadReportsAndSettingsForm,
    transactionFilters: TransactionFiltersForm
}

const initialState: SettingsState = {
    reportSettings: defaultReportSettings,
    transactionFilters: defaultTransactionFilters
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setReportSettings: (state, action: PayloadAction<DownloadReportsAndSettingsForm>) => {
            state.reportSettings = action.payload;
        },
        setTransactionFilters: (state, action: PayloadAction<TransactionFiltersForm>) => {
            state.transactionFilters = action.payload;
        }
    }
})

export const { setReportSettings, setTransactionFilters } = settingsSlice.actions;
export default settingsSlice.reducer;