"use client";

import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import { Box, Card, Grid, Stack, Text, Title } from "@mantine/core";

const MasterDashboard = () => {
    return (
        <Stack>
            <Title component="h3" order={3}>
                Master Dashboard
            </Title>

            <Grid>
                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Today</Text>
                            <Title component="h5" order={5}>
                                18, August
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Revenue</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Net Profit</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Transaction</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Customers</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Sales</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Purchases</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Sales Returns</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Purchases Returns</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Expenses</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Today Sales</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 2 }}>
                    <Card withBorder radius="sm">
                        <Box className="border-l-2 border-primary" pl="sm">
                            <Text>Today Purchases</Text>
                            <Title component="h5" order={5}>
                                0.00
                            </Title>
                        </Box>
                    </Card>
                </Grid.Col>
            </Grid>

            <Grid>
                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <AppTable
                        isFound={Array(10).fill(5).length > 0}
                        isLoading={false}
                        topContent={
                            <Title component="h5" order={4}>
                                Top 10 Sale Items This Month
                            </Title>
                        }
                        headers={[
                            { key: "sl", label: "SL" },
                            { key: "name", label: "Name" },
                            { key: "count", label: "Count" },
                        ]}
                        contentHeight={420}
                        data={Array(10)
                            .fill(1)
                            .map((_, i) => (
                                <AppTableRow key={i}>
                                    <AppTableCell>{i + 1}</AppTableCell>
                                    <AppTableCell>Asus Laptop</AppTableCell>
                                    <AppTableCell>100</AppTableCell>
                                </AppTableRow>
                            ))}
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, lg: 6 }}>
                    <AppTable
                        isFound={Array(10).fill(5).length > 0}
                        isLoading={false}
                        topContent={
                            <Title component="h5" order={4}>
                                Top 10 Customers This Month
                            </Title>
                        }
                        headers={[
                            { key: "sl", label: "SL" },
                            { key: "name", label: "Name" },
                            { key: "amount", label: "Amount" },
                        ]}
                        contentHeight={420}
                        data={Array(10)
                            .fill(1)
                            .map((_, i) => (
                                <AppTableRow key={i}>
                                    <AppTableCell>{i + 1}</AppTableCell>
                                    <AppTableCell>John Doe</AppTableCell>
                                    <AppTableCell>100</AppTableCell>
                                </AppTableRow>
                            ))}
                    />
                </Grid.Col>
            </Grid>
        </Stack>
    );
};

export default MasterDashboard;
