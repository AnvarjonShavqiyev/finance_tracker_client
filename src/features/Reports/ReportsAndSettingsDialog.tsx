import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { useForm } from "react-hook-form";
import { DownloadReportsAndSettingsForm } from "@customTypes";
import { ControlledSelect } from "@components/ControlledSelect";
import { periodOptions, REPORTS_DIALOG_TYPE } from "@constants";
import { useLazyDownloadReportQuery } from "@services/reports";
import {saveAs} from 'file-saver';
import { setReportsAndSettingsDialog } from "@store/reducers/dialog.reducer";
import { setReportSettings } from "@store/reducers/settings.reducer";
import { useMemo } from "react";

import styles from './Reports.module.scss';
import ControlledTextField from "@components/ControlledTextField";

const ReportsAndSettingsDialog = () => {
    const {isOpen, type} = useAppSelector((state) => state.dialog.reportsAndSettingsDialog);
    const {control, handleSubmit} = useForm<DownloadReportsAndSettingsForm>();

    const dispatch = useAppDispatch();
    const [downloadReport, {isLoading: downloadLoading}] = useLazyDownloadReportQuery();

    const isDownloadMode = useMemo(() => {
        return type === REPORTS_DIALOG_TYPE.DOWNLOAD;
    }, [type])

    const onClose = () => {
        dispatch(setReportsAndSettingsDialog({isOpen: false}));
    }

    const onSubmit = async (data: DownloadReportsAndSettingsForm) => {
        const { topNTransaction, period } = data;

        if (type === REPORTS_DIALOG_TYPE.DOWNLOAD) {
            const result = await downloadReport({ n: topNTransaction, period });
            const blob = result?.data;

            if (blob instanceof Blob) {
                saveAs(blob, 'report.xlsx');
            }
        } else {
            dispatch(setReportSettings({topNTransaction, period}));
        }

        onClose();
    }; 


    return <Dialog open={isOpen}>
        <DialogTitle>
            {isDownloadMode ? 'Download reports' : 'Settings'}
        </DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Typography>Please select parameters to {isDownloadMode ? 'download' : 'show correct'} reports.</Typography>
                <ControlledTextField control={control} name="topNTransaction" label="Enter N for top transactions" />
                <ControlledSelect control={control} name="period" label="Select period (Income vs. Expense report)" options={periodOptions} />
                <DialogActions>
                    <Button variant="outlined" onClick={onClose} disabled={downloadLoading}>Cancel</Button>
                    <Button variant="contained" type="submit" loading={downloadLoading}>{isDownloadMode ? 'Download' : 'Save'}</Button>
                </DialogActions>
            </form>
        </DialogContent>
    </Dialog>
};

export default ReportsAndSettingsDialog;