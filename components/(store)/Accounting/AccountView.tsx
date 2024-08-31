import AppLoading from "@/components/UI/AppLoading";
import { AccountType } from "@/lib/models/Account";
import { ExpenseCategoryType } from "@/lib/models/ExpenseCategory";
import { Badge, Group, Stack, Text } from "@mantine/core";
import React from "react";

const AccountView: React.FC<{
    isFetching?: boolean;
    data: AccountType | any;
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
                No: {data?.no || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Opening Balance: {data?.opening_balance || 0}
            </Text>
            <Text size="sm" fw={600}>
                Contact Person: {data?.contactPerson?.name || "N/A"}
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

export default AccountView;
