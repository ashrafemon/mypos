import AppLoading from "@/components/UI/AppLoading";
import { TransactionType } from "@/lib/models/Transaction";
import { Badge, Group, Stack, Text } from "@mantine/core";
import moment from "moment";
import React from "react";

const TransactionView: React.FC<{
    isFetching?: boolean;
    data: TransactionType | any;
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
                Ref No: {data?.refNo || "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Date:{" "}
                {data?.date ? moment(data.date).format("Do MM, YYYY") : "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Amount: {data?.amount || 0}
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

export default TransactionView;
