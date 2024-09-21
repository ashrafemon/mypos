import { LayoutType } from "@/lib/types/types";
import React from "react";

const layout: React.FC<LayoutType> = ({ children }) => {
    return <div className="bg-primary/10 min-h-screen">{children}</div>;
};

export default layout;
