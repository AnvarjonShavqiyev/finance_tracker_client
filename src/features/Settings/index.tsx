import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { SettingsForm } from "@customTypes";
import { useGetSettingsQuery, useSaveSettingsMutation } from "@services/settings";
import { defaultSettings } from "@constants";
import { useEffect } from "react";

import ControlledSwitch from "@components/ControlledSwitch";
import styles from './Settings.module.scss';

const Settings = () => {
    const {handleSubmit, control, reset} = useForm<SettingsForm>({
        defaultValues: defaultSettings,
    });

    const {data, isLoading: settingsLoading} = useGetSettingsQuery();
    const [saveSettings, {isLoading: saveLoading}] = useSaveSettingsMutation();

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data])

    const onSubmit = async (data: SettingsForm) => {
        await saveSettings(data);
    };

    return <Box className={styles.wrapper}>
        {
            settingsLoading ? 
            <CircularProgress /> :
            <>
                <Box>
                    <Typography>Settings</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} id="settingsForm">
                        <ControlledSwitch label="Send daily report" control={control} name="sendDailyReports" />
                    </form>
                </Box>
                <Button className={styles.saveButton} type="submit" form="settingsForm" variant="contained" loading={saveLoading}>Save</Button>
            </>
        }
    </Box>
}

export default Settings;