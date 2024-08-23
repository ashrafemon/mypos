"use client";

import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import AppTable, {
    AppTableCell,
    AppTableFooter,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { AppTableHeaderOptionsType } from "@/lib/types/types";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Badge,
    Button,
    Flex,
    Grid,
    Group,
    Stack,
    Table,
    Text,
    Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const PurchaseReturnForm = () => {
    const router = useRouter();

    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "name", label: "Name" },
            { key: "stock", label: "Stock" },
            { key: "amount", label: "Amount" },
            { key: "quantity", label: "Quantity" },
            { key: "total", label: "Total" },
            { key: "action", label: "Action", align: "center" },
        ],
        []
    );

    return (
        <form>
            <Grid>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <DateField
                        label="Date"
                        placeholder="Ex. 25/01/1999"
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <SelectBox
                        label="Purchase Invoice"
                        placeholder="Ex. PU_25454545"
                        data={ActivityStatusOptions}
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <TextField
                        label="Supplier"
                        placeholder="Ex. Global Brand"
                        withAsterisk
                        readOnly
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <AppTable
                        withRowBorders={false}
                        withColumnBorders={false}
                        isFound={Array(10).fill(5).length > 0}
                        isLoading={false}
                        contentHeight="auto"
                        topContent={
                            <Title component="h5" order={5} ta="center">
                                Purchased Products
                            </Title>
                        }
                        headers={headers}
                        data={Array(5)
                            .fill(1)
                            .map((_, i) => (
                                <AppTableRow key={i}>
                                    <AppTableCell miw={250}>
                                        <Title component="h6" order={6}>
                                            Break Oil Change (484)
                                        </Title>
                                    </AppTableCell>
                                    <AppTableCell w={170}>
                                        <Badge color="orange">100 Kg</Badge>
                                    </AppTableCell>
                                    <AppTableCell w={100}>1000</AppTableCell>
                                    <AppTableCell w={150}>
                                        <TextField placeholder="Ex. 10" />
                                    </AppTableCell>
                                    <AppTableCell w={150}>
                                        <Title component="h5" order={4}>
                                            10000
                                        </Title>
                                        <Text size="sm">Inclusive</Text>
                                    </AppTableCell>
                                    <AppTableCell w={10}>
                                        <Flex gap="xs">
                                            <ActionIcon
                                                size="lg"
                                                variant="light"
                                                color="red"
                                            >
                                                <Icon
                                                    icon="icon-park-outline:delete"
                                                    width={18}
                                                />
                                            </ActionIcon>
                                        </Flex>
                                    </AppTableCell>
                                </AppTableRow>
                            ))}
                        footer={
                            <AppTableFooter>
                                <AppTableRow>
                                    <AppTableCell></AppTableCell>
                                    <AppTableCell colSpan={2}>
                                        <Stack gap="xs">
                                            <Title
                                                component="h6"
                                                order={5}
                                                ta="center"
                                            >
                                                Total Product: 5 (1050)
                                            </Title>

                                            <Button
                                                variant="light"
                                                color="black"
                                                size="xl"
                                                classNames={{
                                                    label: "text-2xl",
                                                }}
                                            >
                                                Total: 100000
                                            </Button>
                                        </Stack>
                                    </AppTableCell>
                                    <AppTableCell colSpan={3}>
                                        <Grid align="flex-start">
                                            <Grid.Col span={6}>
                                                <TextField
                                                    label="Discount"
                                                    placeholder="Ex. 10"
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={6}>
                                                <TextField
                                                    label="Other Charge"
                                                    placeholder="Ex. 10"
                                                />
                                            </Grid.Col>
                                            <Grid.Col span={12}>
                                                <SelectBox
                                                    label="Status"
                                                    placeholder="Ex. Returned"
                                                    data={ActivityStatusOptions}
                                                    withAsterisk
                                                />
                                            </Grid.Col>
                                        </Grid>
                                    </AppTableCell>
                                </AppTableRow>
                            </AppTableFooter>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about purchase return"
                        minRows={2}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/purchases")}
                        >
                            Back
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default PurchaseReturnForm;
