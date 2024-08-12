import { Spinner } from "@nextui-org/react";
import React from "react";

const Loading: React.FC<LoadingType> = ({ label = "Loading..." }) => {
    return <Spinner label={label} />;
};

export default Loading;
