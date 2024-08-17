import React from "react";
import { DateInput, DateInputProps } from "@mantine/dates";
import { Icon } from "@iconify/react";

const DateField: React.FC<DateInputProps> = ({ size = "sm", ...props }) => {
    return (
        <DateInput
            size={size}
            rightSection={<Icon icon="fontisto:date" />}
            {...props}
        />
    );
};

export default DateField;
