"use client";

import DateField from "@/components/UI/DateField";
import SelectBox from "@/components/UI/SelectBox";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextEditor from "@/components/UI/TextEditor";
import TextField from "@/components/UI/TextField";
import { ActivityStatusOptions } from "@/lib/constants/Options";
import { AppTableHeaderOptionsType } from "@/lib/types/types";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Flex, Grid, Group, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

const DamageForm = () => {
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
                        label="Responsible Person"
                        placeholder="Ex. John"
                        data={ActivityStatusOptions}
                        withAsterisk
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <AppTable
                        isFound={Array(10).fill(5).length > 0}
                        isLoading={false}
                        contentHeight={350}
                        topContent={
                            <SelectBox
                                label="Select Product"
                                placeholder="Ex. Select Product"
                                data={ActivityStatusOptions}
                                withAsterisk
                            />
                        }
                        bottomContent={
                            <Grid>
                                <Grid.Col span={{ base: 12, md: 3 }}>
                                    <Title component="h4" order={4}>
                                        Total Products: 5
                                    </Title>
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 3 }}>
                                    <Title component="h4" order={4}>
                                        Total Loss: 10000
                                    </Title>
                                </Grid.Col>
                            </Grid>
                        }
                        headers={headers}
                        data={Array(10)
                            .fill(1)
                            .map((_, i) => (
                                <AppTableRow key={i}>
                                    <AppTableCell>
                                        Break Oil Change (484)
                                    </AppTableCell>
                                    <AppTableCell>
                                        <TextField placeholder="Ex. 10" />
                                    </AppTableCell>
                                    <AppTableCell>
                                        <TextField placeholder="Ex. 10" />
                                    </AppTableCell>
                                    <AppTableCell>10000</AppTableCell>
                                    <AppTableCell>
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
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextEditor
                        label="Description"
                        placeholder="Ex. Something about damage"
                        minRows={2}
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Group gap="xs">
                        <Button>Save</Button>
                        <Button>Save & Add More</Button>
                        <Button
                            color="red"
                            onClick={() => router.push("/damages")}
                        >
                            Back
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default DamageForm;
