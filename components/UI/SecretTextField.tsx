import { PasswordInput, PasswordInputProps } from "@mantine/core";
import React from "react";

type IProps = PasswordInputProps;

const SecretTextField: React.FC<IProps> = ({ ...props }) => {
    return <PasswordInput size="sm" {...props} />;
};

export default SecretTextField;
