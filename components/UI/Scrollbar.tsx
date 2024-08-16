import { LayoutType } from "@/lib/types/types";
import { cn } from "@/lib/utils/helper";
import React from "react";

type IProps = LayoutType & {
    className?: string;
};

const Scrollbar: React.FC<IProps> = ({ className, children }) => {
    return (
        <div
            className={cn(
                "overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-secondary scrollbar-track-white/10",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Scrollbar;
