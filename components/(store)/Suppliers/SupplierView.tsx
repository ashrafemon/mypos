import AppLoading from "@/components/UI/AppLoading";
import { SupplierType } from "@/lib/models/Supplier";
import { Stack, Text } from "@mantine/core";
import React from "react";

const SupplierView: React.FC<{
    isFetching?: boolean;
    data: SupplierType | any;
}> = ({ isFetching = false, data }) => {
    if (isFetching) {
        return <AppLoading />;
    }

    return (
        <Stack gap="xs">
            <Text size="sm" fw={600}>
                Name: {data?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Email: {data?.email || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Phone: {data?.phone || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Contact Person:
                {data?.contactPerson?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Address: {data?.address || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Description: {data?.description || "N/A"}
            </Text>
        </Stack>
    );
};

export default SupplierView;
