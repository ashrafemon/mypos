import StoreLayout from "@/components/(store)/Layout/StoreLayout";
import { LayoutType } from "@/lib/types/types";
import React from "react";

const layout: React.FC<LayoutType> = ({ children }) => {
    return <StoreLayout>{children}</StoreLayout>;
};

export default layout;
