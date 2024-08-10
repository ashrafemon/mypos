import { Input, InputProps } from "@nextui-org/react";
import React from "react";

type IProps = InputProps;

const TextField: React.FC<IProps> = ({ ...props }) => {
    return <Input size="sm" {...props} />;
};

export default TextField;
