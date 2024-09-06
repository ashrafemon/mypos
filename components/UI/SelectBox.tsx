import { Select, SelectProps } from "@mantine/core";
import React from "react";

type IProps = SelectProps;

const SelectBox: React.FC<IProps> = ({ size = "sm", ...props }) => {
    return <Select size={size} searchable {...props} />;
};

export default SelectBox;
