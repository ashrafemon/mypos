"use client";

import { LayoutType } from "@/lib/types/types";
import state from "@/states";
import { Provider } from "react-redux";

const ReduxProvider: React.FC<LayoutType> = ({ children }) => {
    return <Provider store={state}>{children}</Provider>;
};

export default ReduxProvider;
