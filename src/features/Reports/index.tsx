import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { useGetSpendingVsIncomeQuery, useGetSpendsByCategoryQuery, useGetTopNTransactionsQuery } from "@services/reports";
import { REPORTS_DIALOG_TYPE, transactionBaseColumns } from "@constants";
import { getSpendsByCategoryOptions, getSpendsVsIncomeOptions } from "./helpers";
import { FiDownload } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@hooks/reduxHooks";
import { setReportsAndSettingsDialog } from "@store/reducers/dialog.reducer";
import { RootState } from "@store/store";

import Charts from "@components/Charts";
import CustomTable from "@components/Table";
import ReportsAndSettingsDialog from "./ReportsAndSettingsDialog";

import styles from './Reports.module.scss';

const Reports = () => {
    const dispatch = useAppDispatch();

    const {topNTransaction, period} = useAppSelector((state: RootState) => state.settings.reportSettings);
    const {data} = useGetTopNTransactionsQuery(topNTransaction);
    const {data:categorySpends} = useGetSpendsByCategoryQuery();
    const {data:spendsVsIncome} = useGetSpendingVsIncomeQuery(period);

    const openReportsAnsSettingsDialog = (type: REPORTS_DIALOG_TYPE) => {
        dispatch(setReportsAndSettingsDialog({isOpen: true, type}));
    }

    return <Box className={styles.container}>
        <Box className={styles.header}>
            <Typography>Reports</Typography>
            <Box>
                <Tooltip placement="top" title="Settings">
                    <IconButton onClick={() => openReportsAnsSettingsDialog(REPORTS_DIALOG_TYPE.SETTINGS)}><IoSettingsOutline width={24}/></IconButton>
                </Tooltip>
                <Tooltip placement="top" title="Download reports">
                    <IconButton onClick={() => openReportsAnsSettingsDialog(REPORTS_DIALOG_TYPE.DOWNLOAD)}><FiDownload width={24}/></IconButton>
                </Tooltip>
            </Box>
        </Box>
        <Divider/>
        <Charts option={getSpendsByCategoryOptions(categorySpends!)} />
        <Charts option={getSpendsVsIncomeOptions(spendsVsIncome!)} />
        <Box className={styles.tableHeader}>
            <Typography>Top {topNTransaction} transaction</Typography>
            <CustomTable columns={transactionBaseColumns} data={data} />
        </Box>
        <ReportsAndSettingsDialog />
    </Box>
};

export default Reports;