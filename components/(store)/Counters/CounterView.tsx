import AppLoading from "@/components/UI/AppLoading";
import { CounterType } from "@/lib/models/Counter";
import { Badge, Group, Stack, Text } from "@mantine/core";
import React from "react";

const CounterView: React.FC<{
    isFetching?: boolean;
    data: CounterType | any;
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

export default CounterView;
