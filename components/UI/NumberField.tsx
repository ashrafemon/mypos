import { NumberInput, NumberInputProps } from "@mantine/core";
import React from "react";

type IProps = NumberInputProps;

const NumberField: React.FC<IProps> = ({ ...props }) => {
    return (
        <NumberInput
            size="sm"
            autoFocus
            onFocus={(e) => e.target.select()}
            {...props}
        />
    );
};

export default NumberField;
