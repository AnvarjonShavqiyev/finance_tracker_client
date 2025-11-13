import { Box, Switch, Typography } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import styles from './ControlledSwitch.module.scss';

interface ControlledSwitchProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
}

const ControlledSwitch = <T extends FieldValues>({
    name, control, label
}: ControlledSwitchProps<T>) => {
    return <Controller
    name={name}
    control={control}
    render={({field}) => (
            <Box className={styles.wrapper}>
                <Typography>{label}</Typography>
                <Switch checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)}/>
            </Box>
        )}
    />
}

export default ControlledSwitch;