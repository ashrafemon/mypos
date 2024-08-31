"use client";

import AppLoading from "@/components/UI/AppLoading";
import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { CustomerGroupType } from "@/lib/models/CustomerGroup";
import { AppTableHeaderOptionsType, IValueType } from "@/lib/types/types";
import { message, promptMessage } from "@/lib/utils/helper";
import {
    useDeleteCustomerGroupMutation,
    useFetchCustomerGroupQuery,
    useFetchCustomerGroupsQuery,
} from "@/states/actions/stores/customerGroups";
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
import CustomerGroupForm from "./CustomerGroupForm";
import CustomerGroupView from "./CustomerGroupView";

const CustomerGroupList = () => {
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

    const { data, isFetching, isError, error } = useFetchCustomerGroupsQuery(
        `offset=${queries.page}&limit=${queries.offset}${
            queries.search ? `&search=${queries.search}` : ""
        }`
    );

    const [deleteGroup, result] = useDeleteCustomerGroupMutation();
    const deleteHandler = (id: string | any) => {
        promptMessage(async () => {
            try {
                const payload = await deleteGroup(id).unwrap();
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
        data: group,
        isFetching: groupIsFetching,
        isUninitialized: groupIsUninitialized,
    } = useFetchCustomerGroupQuery(selectedId, {
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
                title="View Customer Group"
                classNames={{ title: "text-lg font-semibold" }}
                centered
            >
                <CustomerGroupView data={group} isFetching={groupIsFetching} />
            </Modal>

            <Modal
                opened={formOpened}
                onClose={() => formHandler("close")}
                title={`${type === "edit" ? "Update" : "Add"} Customer Group`}
                classNames={{ title: "text-lg font-semibold" }}
                centered
            >
                <CustomerGroupForm
                    close={() => formHandler("close")}
                    data={!groupIsUninitialized ? group : null}
                    isFetching={groupIsFetching}
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
                            Customer Group List
                        </Title>

                        <TextField
                            placeholder="Search Customer Group"
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
                                onClick={() => formHandler("add")}
                            >
                                Add Customer Group
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
                data={data?.data?.map((item: CustomerGroupType, i: number) => (
                    <AppTableRow key={i}>
                        <AppTableCell>
                            <Checkbox />
                        </AppTableCell>
                        <AppTableCell>{item.name}</AppTableCell>
                        <AppTableCell>
                            <Badge
                                color={
                                    item.status === "active" ? "green" : "red"
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
                                    onClick={() => viewHandler("open", item.id)}
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
                                    onClick={() => formHandler("edit", item.id)}
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
                ))}
            />
        </>
    );
};

export default CustomerGroupList;
