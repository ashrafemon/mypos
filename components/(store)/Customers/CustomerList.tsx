"use client";

import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { CustomerType } from "@/lib/models/Customer";
import { AppTableHeaderOptionsType, IValueType } from "@/lib/types/types";
import { message, promptMessage } from "@/lib/utils/helper";
import {
    useDeleteCustomerMutation,
    useFetchCustomerQuery,
    useFetchCustomersQuery,
} from "@/states/actions/stores/customers";
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
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import CustomerView from "./CustomerView";

const CustomerList = () => {
    const router = useRouter();

    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "checkbox", label: "Checkbox", align: "center" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
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

    const { data, isFetching, isError, error } = useFetchCustomersQuery(
        `offset=${queries.page}&limit=${queries.offset}${
            queries.search ? `&search=${queries.search}` : ""
        }`
    );

    const [deleteCustomer, result] = useDeleteCustomerMutation();
    const deleteHandler = (id: string | any) => {
        promptMessage(async () => {
            try {
                const payload = await deleteCustomer(id).unwrap();
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

    const { data: customer, isFetching: customerIsFetching } =
        useFetchCustomerQuery(selectedId, {
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
                title="View Customer"
                classNames={{ title: "text-lg font-semibold" }}
                centered
            >
                <CustomerView data={customer} isFetching={customerIsFetching} />
            </Modal>

            <AppTable
                isFound={data?.data?.length > 0}
                isLoading={isFetching}
                isError={isError}
                error={error}
                topContent={
                    <Flex justify="space-between" gap="xs">
                        <Title component="h5" order={3}>
                            Customer List
                        </Title>

                        <TextField
                            placeholder="Search Customer"
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
                                onClick={() => router.push("/customers/create")}
                            >
                                Add Customer
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
                data={data?.data?.map((item: CustomerType, i: number) => (
                    <AppTableRow key={i}>
                        <AppTableCell>
                            <Checkbox />
                        </AppTableCell>
                        <AppTableCell>{item?.name || "N/A"}</AppTableCell>
                        <AppTableCell>{item?.email || "N/A"}</AppTableCell>
                        <AppTableCell>{item?.phone || "N/A"}</AppTableCell>
                        <AppTableCell>
                            <Badge
                                color={
                                    item?.status === "active" ? "green" : "red"
                                }
                            >
                                {item?.status}
                            </Badge>
                        </AppTableCell>
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
                                        router.push(
                                            `/customers/${item?.id}/edit`
                                        )
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

export default CustomerList;
