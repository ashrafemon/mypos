import AppLoading from "@/components/UI/AppLoading";
import { CustomerType } from "@/lib/models/Customer";
import { Badge, Group, Stack, Text } from "@mantine/core";
import moment from "moment";
import React from "react";

const CustomerView: React.FC<{
    isFetching?: boolean;
    data: CustomerType | any;
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
                Date of Birth:
                {data?.dob ? moment(data.dob).format("Do MM, YYYY") : "N/A"}
            </Text>
            <Text size="sm" fw={600}>
                Discount: {data?.discount || 0}
            </Text>
            <Text size="sm" fw={600}>
                Address: {data?.address || "N/A"}
            </Text>
            <Group>
                <Text size="sm" fw={600}>
                    Type:
                </Text>
                <Badge>{data?.type}</Badge>
            </Group>
            <Group>
                <Text size="sm" fw={600}>
                    Status:
                </Text>
                <Badge color={data?.status === "active" ? "green" : "red"}>
                    {data?.status}
                </Badge>
            </Group>
        </Stack>
    );
};

export default CustomerView;
