import { LoaderType } from "@/lib/types/types";
import { Box, Loader, Text, Title } from "@mantine/core";
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
                    <Text className="text-6xl" fw={600} c="red">
                        {error.status || error?.data?.statusCode}
                    </Text>
                    <Title component="h5" order={1} c="red">
                        {error.originalStatus || error?.data?.status}
                    </Title>
                    <Title component="h5" order={4} c="red">
                        {error.error || error?.data?.message}
                    </Title>
                </>
            )}
            {isLoading && <Loader size={size} {...props} />}
        </Box>
    );
};

export default AppLoading;
