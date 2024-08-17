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
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const IncomeList = () => {
    const router = useRouter();

    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "checkbox", label: "Checkbox", align: "center" },
            { key: "ref_no", label: "Ref. No" },
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "amount", label: "Amount" },
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
                        Income List
                    </Title>

                    <TextField
                        placeholder="Search Income"
                        leftSection={<Icon icon="mingcute:search-line" />}
                        value={queries.search}
                        onChange={(e) =>
                            handleQueryChange("search", e.target.value)
                        }
                    />

                    <Flex gap="xs" align="center">
                        <Button
                            variant="light"
                            leftSection={<Icon icon="fluent:add-12-filled" />}
                            onClick={() => router.push("/incomes/create")}
                        >
                            Add Income
                        </Button>
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
                        <AppTableCell>EX_11254</AppTableCell>
                        <AppTableCell>Water bill</AppTableCell>
                        <AppTableCell>Maintenance</AppTableCell>
                        <AppTableCell>100.00</AppTableCell>
                        <AppTableCell>
                            <Flex gap="xs">
                                <ActionIcon size="lg" variant="light">
                                    <Icon
                                        icon="carbon:view-filled"
                                        width={18}
                                    />
                                </ActionIcon>
                                <ActionIcon
                                    size="lg"
                                    variant="light"
                                    color="orange"
                                >
                                    <Icon
                                        icon="weui:pencil-filled"
                                        width={18}
                                    />
                                </ActionIcon>
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
    );
};

export default IncomeList;
