import AppLoading from "@/components/UI/AppLoading";
import { AccountTransferType } from "@/lib/models/AccountTransfer";
import { Badge, Group, Stack, Text } from "@mantine/core";
import moment from "moment";
import React from "react";

const AccountTransferView: React.FC<{
    isFetching?: boolean;
    data: AccountTransferType | any;
}> = ({ isFetching = false, data }) => {
    if (isFetching) {
        return <AppLoading />;
    }

    return (
        <Stack gap="xs">
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

export default AccountTransferView;
