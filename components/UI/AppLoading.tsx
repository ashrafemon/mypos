import { LoaderType } from "@/lib/types/types";
import { Box, Loader, Title } from "@mantine/core";
import React from "react";

const AppLoading: React.FC<LoaderType> = ({
    size = 100,
    isLoading = true,
    isError = false,
    error,
    ...props
}) => {
    return (
        <Box ta="center" p="xl">
            {isError && (
                <>
                    <Title component="h5" order={3}>
                        {error.status}
                    </Title>
                    <Title component="h5" order={1}>
                        {error.originalStatus}
                    </Title>
                    <Title component="h5" order={4}>
                        {error.error}
                    </Title>
                </>
            )}
            {isLoading && <Loader size={size} {...props} />}
        </Box>
    );
};

export default AppLoading;
