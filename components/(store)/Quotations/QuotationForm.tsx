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

const QuotationForm = () => {
    const router = useRouter();

    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "name", label: "Name" },
            { key: "quantity", label: "Quantity" },
            { key: "amount", label: "Amount" },
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
                        label="Customer"
                        placeholder="Ex. Global Brand"
                        data={ActivityStatusOptions}
                        withAsterisk
                        leftSection={
                            <ActionIcon onClick={() => console.log("Hello")}>
                                <Icon icon="fluent:add-12-filled" />
                            </ActionIcon>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <SelectBox
                        label="Status"
                        placeholder="Ex. Sent"
                        data={ActivityStatusOptions}
                        withAsterisk
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
                            <SelectBox
                                label="Select Product"
                                placeholder="Ex. Select Product"
                                data={ActivityStatusOptions}
                                withAsterisk
                            />
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
                                    <AppTableCell w={100}>
                                        <TextField placeholder="Ex. 10" />
                                    </AppTableCell>
                                    <AppTableCell w={200}>
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
                                    <AppTableCell colSpan={4}>
                                        <Stack gap="xs">
                                            <Title
                                                component="h6"
                                                order={5}
                                                ta="center"
                                            >
                                                Total Product: 5 (1050)
                                            </Title>

                                            <TextField
                                                label="Discount"
                                                placeholder="Ex. 10"
                                            />
                                            <TextField
                                                label="Other Charge"
                                                placeholder="Ex. 10"
                                            />

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
                                </AppTableRow>
                            </AppTableFooter>
                        }
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about quotation"
                        minRows={2}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/quotations")}
                        >
                            Back
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default QuotationForm;
