import AppLoading from "@/components/UI/AppLoading";
import { ProductType } from "@/lib/models/Product";
import { Stack, Text } from "@mantine/core";
import React from "react";

const ProductView: React.FC<{
    isFetching?: boolean;
    data: ProductType | any;
}> = ({ isFetching = false, data }) => {
    if (isFetching) {
        return <AppLoading />;
    }

    return (
        <Stack gap="xs">
            <Text size="sm" fw={600}>
                Type: {data?.type || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Name: {data?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Code: {data?.code || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Price: {data?.price || 0}
            </Text>
            <Text size="sm" fw={600}>
                Discount: {data?.discount || 0}
            </Text>
            <Text size="sm" fw={600}>
                Loyalty Point: {data?.loyaltyPoint || 0}
            </Text>
            <Text size="sm" fw={600}>
                Alert Quantity: {data?.alertQuantity || 0}
            </Text>
            <Text size="sm" fw={600}>
                Supplier:
                {data?.supplier?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Category:
                {data?.category?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Brand:
                {data?.brand?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Unit:
                {data?.brand?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Tax Method:
                {data?.taxMethod || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Tax Rate:
                {data?.taxRate?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Description: {data?.description || "N/A"}
            </Text>
        </Stack>
    );
};

export default ProductView;
