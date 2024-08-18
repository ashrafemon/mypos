import { Box, Loader, LoaderProps } from "@mantine/core";
import React from "react";

const AppLoading: React.FC<LoaderProps> = ({ size = 100, ...props }) => {
    return (
        <Box ta="center" p="xl">
            <Loader size={size} {...props} />
        </Box>
    );
};

export default AppLoading;
