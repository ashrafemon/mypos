import { Textarea, TextareaProps } from "@mantine/core";
import React from "react";

const TextEditor: React.FC<TextareaProps> = ({
    size = "sm",
    autosize = true,
    ...props
}) => {
    return <Textarea size={size} autosize={autosize} {...props} />;
};

export default TextEditor;
