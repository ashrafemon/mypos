"use client";

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
import {
    ActionIcon,
    Button,
    Fieldset,
    Flex,
    Grid,
    Group,
    Stack,
    Switch,
    Title,
} from "@mantine/core";
import { useMemo } from "react";

const BarcodeForm = () => {
    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "name", label: "Name (Code)" },
            { key: "quantity", label: "Quantity" },
            { key: "action", label: "Action", align: "center" },
        ],
        []
    );

    return (
        <form>
            <Stack>
                <SelectBox
                    label="Product"
                    placeholder="Ex. Select Product"
                    data={ActivityStatusOptions}
                    withAsterisk
                />
                <SelectBox
                    label="Print Page"
                    placeholder="Ex. A4"
                    data={ActivityStatusOptions}
                    withAsterisk
                />
                <Fieldset legend="Printing Property">
                    <Group>
                        <Switch size="sm" label="Store Name" />
                        <Switch size="sm" label="Name" />
                        <Switch size="sm" label="Code" />
                        <Switch size="sm" label="Price" />
                        <Switch size="sm" label="Image" />
                    </Group>
                </Fieldset>

                <AppTable
                    isFound={Array(10).fill(5).length > 0}
                    isLoading={false}
                    contentHeight={350}
                    topContent={
                        <Title component="h4" order={4} ta="center">
                            Printing Products
                        </Title>
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

                <Group gap="xs">
                    <Button>Preview</Button>
                    <Button color="red">Back</Button>
                </Group>
            </Stack>
        </form>
    );
};

export default BarcodeForm;
