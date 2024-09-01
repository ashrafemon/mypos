"use client";

import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { ExpenseCategoryType } from "@/lib/models/ExpenseCategory";
import { AppTableHeaderOptionsType, IValueType } from "@/lib/types/types";
import { message, promptMessage } from "@/lib/utils/helper";
import {
    useDeleteIncomeCategoryMutation,
    useFetchIncomeCategoriesQuery,
    useFetchIncomeCategoryQuery,
} from "@/states/actions/stores/incomeCategories";
import { Icon } from "@iconify/react";
import {
    ActionIcon,
    Badge,
    Button,
    Checkbox,
    Flex,
    Modal,
    Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryView from "./CategoryView";

const CategoryList = () => {
    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "checkbox", label: "Checkbox", align: "center" },
            { key: "name", label: "Name" },
            { key: "status", label: "Status" },
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

    const { data, isFetching, isError, error } = useFetchIncomeCategoriesQuery(
        `offset=${queries.page}&limit=${queries.offset}${
            queries.search ? `&search=${queries.search}` : ""
        }`
    );

    const [deleteCategory, result] = useDeleteIncomeCategoryMutation();
    const deleteHandler = (id: string | any) => {
        promptMessage(async () => {
            try {
                const payload = await deleteCategory(id).unwrap();
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
    const [type, setType] = useState<string | null>(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [formOpened, { open: formOpen, close: formClose }] =
        useDisclosure(false);

    const {
        data: category,
        isFetching: categoryIsFetching,
        isUninitialized: categoryIsUninitialized,
    } = useFetchIncomeCategoryQuery(selectedId, {
        skip: !selectedId,
        refetchOnMountOrArgChange: true,
    });

    const viewHandler = (type: string, id: string | any = null) => {
        setSelectedId(id);
        type === "open" ? open() : close();
        return;
    };

    const formHandler = (type: string, id: string | any = null) => {
        setType(type === "close" ? null : type);
        setSelectedId(id);
        type === "close" ? formClose() : formOpen();
        return;
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => viewHandler("close")}
                title="View Category"
                classNames={{ title: "text-lg font-semibold" }}
                centered
            >
                <CategoryView data={category} isFetching={categoryIsFetching} />
            </Modal>

            <Modal
                opened={formOpened}
                onClose={() => formHandler("close")}
                title={`${type === "edit" ? "Update" : "Add"} Category`}
                classNames={{ title: "text-lg font-semibold" }}
                centered
            >
                <CategoryForm
                    close={() => formHandler("close")}
                    data={!categoryIsUninitialized ? category : null}
                    isFetching={categoryIsFetching}
                />
            </Modal>

            <AppTable
                isFound={data?.data?.length > 0}
                isLoading={isFetching}
                isError={isError}
                error={error}
                topContent={
                    <Flex justify="space-between" gap="xs">
                        <Title component="h5" order={3}>
                            Income Category List
                        </Title>

                        <TextField
                            placeholder="Search Income Category"
                            leftSection={<Icon icon="mingcute:search-line" />}
                        />

                        <Flex gap="xs" align="center">
                            <Button
                                variant="light"
                                leftSection={
                                    <Icon icon="fluent:add-12-filled" />
                                }
                                onClick={() => formHandler("add")}
                            >
                                Add Income Category
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
                data={data?.data?.map(
                    (item: ExpenseCategoryType, i: number) => (
                        <AppTableRow key={i}>
                            <AppTableCell>
                                <Checkbox />
                            </AppTableCell>
                            <AppTableCell>{item.name}</AppTableCell>
                            <AppTableCell>
                                <Badge
                                    color={
                                        item.status === "active"
                                            ? "green"
                                            : "red"
                                    }
                                >
                                    {item.status}
                                </Badge>
                            </AppTableCell>
                            <AppTableCell>
                                <Flex gap="xs" justify="center">
                                    <ActionIcon
                                        size="lg"
                                        variant="light"
                                        onClick={() =>
                                            viewHandler("open", item.id)
                                        }
                                        loading={result.isLoading}
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
                                        onClick={() =>
                                            formHandler("edit", item.id)
                                        }
                                        loading={result.isLoading}
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
                                        onClick={() => deleteHandler(item.id)}
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
                    )
                )}
            />
        </>
    );
};

export default CategoryList;
