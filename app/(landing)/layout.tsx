import { LayoutType } from "@/lib/types/types";
import React from "react";

const layout: React.FC<LayoutType> = ({ children }) => {
    return <div>{children}</div>;
};

export default layout;
