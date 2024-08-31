import AppLoading from "@/components/UI/AppLoading";
import { ExpenseType } from "@/lib/models/Expense";
import { Badge, Group, Stack, Text } from "@mantine/core";
import moment from "moment";
import React from "react";

const ExpenseView: React.FC<{
    isFetching?: boolean;
    data: ExpenseType | any;
}> = ({ isFetching = false, data }) => {
    if (isFetching) {
        return <AppLoading />;
    }

    return (
        <Stack gap="xs">
            <Text size="sm" fw={600}>
                RefNo: {data?.refNo || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Title: {data?.title || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Category: {data?.category?.name || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Amount: {data?.amount || 0}
            </Text>
            <Text size="sm" fw={600}>
                Description: {data?.description || "N/A"}
            </Text>
            <Group>
                <Text size="sm" fw={600}>
                    Status:
                </Text>
                <Badge color={data?.status === "pending" ? "orange" : "green"}>
                    {data?.status}
                </Badge>
            </Group>
        </Stack>
    );
};

export default ExpenseView;
