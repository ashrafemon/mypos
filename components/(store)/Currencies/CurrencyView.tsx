import AppLoading from "@/components/UI/AppLoading";
import { CurrencyType } from "@/lib/models/Currency";
import { Badge, Group, Stack, Text } from "@mantine/core";
import React from "react";

const CurrencyView: React.FC<{
    isFetching?: boolean;
    data: CurrencyType | any;
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
                Short Name: {data?.shortName || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Symbol: {data?.symbol || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Decimal Place: {data?.decimalPlace || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Position: {data?.position || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Description: {data?.description || "N/A"}
            </Text>
            <Group>
                <Text size="sm" fw={600}>
                    Status
                </Text>
                <Badge color={data?.status === "active" ? "green" : "red"}>
                    {data?.status}
                </Badge>
            </Group>
        </Stack>
    );
};

export default CurrencyView;
