import { Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { SettingsForm } from "../../types";
import { useGetSettingsQuery, useSaveSettingsMutation } from "../../services/settings";
import { defaultSettings } from "../../constants";
import { useEffect } from "react";

import ControlledSwitch from "../../components/ControlledSwitch";
import styles from './Settings.module.scss';

const Settings = () => {
    const {handleSubmit, control, reset} = useForm<SettingsForm>({
        defaultValues: defaultSettings,
    });

    const {data} = useGetSettingsQuery();
    const [saveSettings] = useSaveSettingsMutation();

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data])

    const onSubmit = async (data: SettingsForm) => {
        await saveSettings(data);
    };

    return <Box className={styles.wrapper}>
        <Box>
            <Typography>Settings</Typography>
            <form onSubmit={handleSubmit(onSubmit)} id="settingsForm">
                <ControlledSwitch label="Send daily report" control={control} name="sendDailyReports" />
            </form>
        </Box>
        <Button className={styles.saveButton} type="submit" form="settingsForm" variant="contained">Save</Button>
    </Box>
}

export default Settings;