"use client";

import { Card, Grid, Stack, Table, Text, Title } from "@mantine/core";
import { useMemo } from "react";

const CounterDashboard = () => {
    const headers = useMemo(
        () => [
            { label: "Payment Method", key: "payment_method" },
            { label: "No of Orders", key: "no_orders" },
            { label: "Amount", key: "amount" },
        ],
        []
    );

    return (
        <Stack>
            <Title component="h3" order={3}>
                Billing Counter Dashboard
            </Title>

            <Grid>
                {Array(6)
                    .fill(1)
                    .map((_, i) => (
                        <Grid.Col span={{ base: 12, md: 4 }} key={i}>
                            <Card withBorder shadow="sm">
                                <Card.Section p="sm" withBorder>
                                    <Text size="lg">C1 - Bill Counter 1</Text>
                                </Card.Section>
                                <Card.Section p="sm" withBorder>
                                    <Grid>
                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Text size="sm">Total Orders</Text>
                                            <Text size="lg">0</Text>
                                        </Grid.Col>
                                        <Grid.Col span={{ base: 12, md: 6 }}>
                                            <Text size="sm">Order Value</Text>
                                            <Text size="lg">USD 0</Text>
                                        </Grid.Col>
                                    </Grid>
                                </Card.Section>
                                <Card.Section withBorder>
                                    <Table striped highlightOnHover>
                                        <Table.Thead>
                                            <Table.Tr>
                                                {headers.map((item, hI) => (
                                                    <Table.Th key={hI}>
                                                        {item.label}
                                                    </Table.Th>
                                                ))}
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {Array(5)
                                                .fill(1)
                                                .map((_, cI) => (
                                                    <Table.Tr key={cI}>
                                                        <Table.Td>
                                                            Payment Method
                                                        </Table.Td>
                                                        <Table.Td>
                                                            No of Orders
                                                        </Table.Td>
                                                        <Table.Td>
                                                            Order Value
                                                        </Table.Td>
                                                    </Table.Tr>
                                                ))}
                                        </Table.Tbody>
                                    </Table>
                                </Card.Section>
                            </Card>
                        </Grid.Col>
                    ))}
            </Grid>
        </Stack>
    );
};

export default CounterDashboard;
