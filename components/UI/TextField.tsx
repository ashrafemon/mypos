import { TextInput, TextInputProps } from "@mantine/core";
import React from "react";

type IProps = TextInputProps;

const TextField: React.FC<IProps> = ({ ...props }) => {
    return (
        <TextInput size="sm" onFocus={(e) => e.target.select()} {...props} />
    );
};

export default TextField;
