"use client";

import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { AppTableHeaderOptionsType, IValueType } from "@/lib/types/types";
import { message, promptMessage } from "@/lib/utils/helper";
import { useFetchIncomeCategoryQuery } from "@/states/actions/stores/incomeCategories";
import {
    useDeleteIncomeMutation,
    useFetchIncomesQuery,
} from "@/states/actions/stores/incomes";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Button,
    Checkbox,
    Flex,
    Modal,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import IncomeView from "./IncomeView";
import { IncomeType } from "@/lib/models/Income";
import moment from "moment";

const IncomeList = () => {
    const router = useRouter();

    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "checkbox", label: "Checkbox", align: "center" },
            { key: "ref_no", label: "Ref. No" },
            { key: "date", label: "Date" },
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

    const { data, isFetching, isError, error } = useFetchIncomesQuery(
        `offset=${queries.page}&limit=${queries.offset}${
            queries.search ? `&search=${queries.search}` : ""
        }`
    );

    const [deleteIncome, result] = useDeleteIncomeMutation();
    const deleteHandler = (id: string | any) => {
        promptMessage(async () => {
            try {
                const payload = await deleteIncome(id).unwrap();
                message({
                    title: payload.message,
                    icon: "success",
                    timer: 3000,
                });
            } catch (err: { message: string; status: string } | any) {
                message({
                    title: err.message,
                    icon: "error",
                    timer: 3000,
                });
            }
        });
    };

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [opened, { open, close }] = useDisclosure(false);

    const { data: income, isFetching: incomeIsFetching } =
        useFetchIncomeCategoryQuery(selectedId, {
            skip: !selectedId,
            refetchOnMountOrArgChange: true,
        });

    const viewHandler = (type: string, id: string | any = null) => {
        setSelectedId(id);
        type === "open" ? open() : close();
        return;
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => viewHandler("close")}
                title="View Expense"
                classNames={{ title: "text-lg font-semibold" }}
                centered
            >
                <IncomeView data={income} isFetching={incomeIsFetching} />
            </Modal>

            <AppTable
                isFound={data?.data?.length > 0}
                isLoading={isFetching}
                isError={isError}
                error={error}
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
                                leftSection={
                                    <Icon icon="fluent:add-12-filled" />
                                }
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
                data={data?.data?.map((item: IncomeType, i: number) => (
                    <AppTableRow key={i}>
                        <AppTableCell>
                            <Checkbox />
                        </AppTableCell>
                        <AppTableCell>{item?.refNo || "N/A"}</AppTableCell>
                        <AppTableCell>
                            {item?.date
                                ? moment(item.date).format("Do MM, YYYY")
                                : "N/A"}
                        </AppTableCell>
                        <AppTableCell>{item?.title || "N/A"}</AppTableCell>
                        <AppTableCell>
                            {item?.category?.name || "N/A"}
                        </AppTableCell>
                        <AppTableCell>{item?.amount || 0}</AppTableCell>
                        <AppTableCell>
                            <Flex gap="xs" justify="center">
                                <ActionIcon
                                    size="lg"
                                    variant="light"
                                    loading={result.isLoading}
                                    onClick={() =>
                                        viewHandler("open", item?.id)
                                    }
                                >
                                    <Icon
                                        icon="carbon:view-filled"
                                        width={18}
                                    />
                                </ActionIcon>
                                <ActionIcon
                                    size="lg"
                                    variant="light"
                                    color="orange"
                                    loading={result.isLoading}
                                    onClick={() =>
                                        router.push(`/incomes/${item?.id}/edit`)
                                    }
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
                                    onClick={() => deleteHandler(item?.id)}
                                    loading={result.isLoading}
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
        </>
    );
};

export default IncomeList;
