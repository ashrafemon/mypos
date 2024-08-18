"use client";

import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { AppTableHeaderOptionsType, IValueType } from "@/lib/types/types";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Checkbox, Flex, Title } from "@mantine/core";
import { useMemo, useState } from "react";

const StockList = () => {
    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "checkbox", label: "Checkbox", align: "center" },
            { key: "name", label: "Name (Code)" },
            { key: "current_stock", label: "Current Stock" },
            { key: "bought_quantity", label: "Bought Quantity" },
            { key: "sold_quantity", label: "Sold Quantity" },
            { key: "damaged_quantity", label: "Damaged Quantity" },
            { key: "returned_quantity", label: "Returned Quantity" },
            { key: "action", label: "Action", align: "center" },
        ],
        []
    );
    const [queries, setQueries] = useState({
        page: 1,
        offset: 10,
        search: "",
    });

    const handleQueryChange = (field: string, value: IValueType) => {
        setQueries((prevState) => ({ ...prevState, [field]: value }));
    };

    return (
        <AppTable
            isFound={Array(10).fill(5).length > 0}
            isLoading={false}
            topContent={
                <Flex justify="space-between" gap="xs">
                    <Title component="h5" order={3}>
                        Stock List
                    </Title>

                    <TextField
                        placeholder="Search Product"
                        leftSection={<Icon icon="mingcute:search-line" />}
                        value={queries.search}
                        onChange={(e) =>
                            handleQueryChange("search", e.target.value)
                        }
                    />

                    <Flex gap="xs" align="center">
                        <Button
                            variant="light"
                            leftSection={<Icon icon="bx:export" />}
                        >
                            Export
                        </Button>
                    </Flex>
                </Flex>
            }
            bottomContent={
                <AppPaginator
                    page={queries.page}
                    offset={queries.offset}
                    total={10}
                    actionHandler={(field, value) =>
                        handleQueryChange(field, value)
                    }
                />
            }
            headers={headers}
            data={Array(10)
                .fill(1)
                .map((_, i) => (
                    <AppTableRow key={i}>
                        <AppTableCell>
                            <Checkbox />
                        </AppTableCell>
                        <AppTableCell>Break Oil Change (484)</AppTableCell>
                        <AppTableCell>10</AppTableCell>
                        <AppTableCell>20</AppTableCell>
                        <AppTableCell>10</AppTableCell>
                        <AppTableCell>00</AppTableCell>
                        <AppTableCell>00</AppTableCell>
                        <AppTableCell>
                            <Flex gap="xs">
                                <ActionIcon size="lg" variant="light">
                                    <Icon
                                        icon="carbon:view-filled"
                                        width={18}
                                    />
                                </ActionIcon>
                            </Flex>
                        </AppTableCell>
                    </AppTableRow>
                ))}
        />
    );
};

export default StockList;
