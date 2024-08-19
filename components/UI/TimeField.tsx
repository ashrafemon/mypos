import { Icon } from "@iconify/react";
import { ActionIcon } from "@mantine/core";
import { TimeInput, TimeInputProps } from "@mantine/dates";
import React, { useRef } from "react";

const TimeField: React.FC<TimeInputProps> = ({ ...props }) => {
    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => ref.current?.showPicker()}
        >
            <Icon icon="tabler:clock" />
        </ActionIcon>
    );

    return <TimeInput ref={ref} rightSection={pickerControl} {...props} />;
};

export default TimeField;
