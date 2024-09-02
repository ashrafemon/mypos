"use client";

import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { OutletType } from "@/lib/models/Outlet";
import { AppTableHeaderOptionsType, IValueType } from "@/lib/types/types";
import { message, promptMessage } from "@/lib/utils/helper";
import {
    useDeleteOutletMutation,
    useFetchOutletQuery,
    useFetchOutletsQuery,
} from "@/states/actions/stores/outlets";
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
import StoreView from "./StoreView";

const StoreList = () => {
    const router = useRouter();

    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "checkbox", label: "Checkbox", align: "center" },
            { key: "name", label: "Name" },
            { key: "code", label: "Code" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
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

    const { data, isFetching, isError, error } = useFetchOutletsQuery(
        `offset=${queries.page}&limit=${queries.offset}${
            queries.search ? `&search=${queries.search}` : ""
        }`
    );

    const [deleteOutlet, result] = useDeleteOutletMutation();
    const deleteHandler = (id: string | any) => {
        promptMessage(async () => {
            try {
                const payload = await deleteOutlet(id).unwrap();
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

    const { data: store, isFetching: storeIsFetching } = useFetchOutletQuery(
        selectedId,
        {
            skip: !selectedId,
            refetchOnMountOrArgChange: true,
        }
    );

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
                title="View Store"
                classNames={{ title: "text-lg font-semibold" }}
                centered
            >
                <StoreView data={store} isFetching={storeIsFetching} />
            </Modal>

            <AppTable
                isFound={data?.data?.length > 0}
                isLoading={isFetching}
                isError={isError}
                error={error}
                topContent={
                    <Flex justify="space-between" gap="xs">
                        <Title component="h5" order={3}>
                            Store List
                        </Title>

                        <TextField
                            placeholder="Search Store"
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
                                onClick={() => router.push("/stores/create")}
                            >
                                Add Store
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
                data={data?.data?.map((item: OutletType, i: number) => (
                    <AppTableRow key={i}>
                        <AppTableCell>
                            <Checkbox />
                        </AppTableCell>
                        <AppTableCell>{item.name || "N/A"}</AppTableCell>
                        <AppTableCell>{item.code || "N/A"}</AppTableCell>
                        <AppTableCell>{item.email || "N/A"}</AppTableCell>
                        <AppTableCell>{item.phone || "N/A"}</AppTableCell>
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
                                        router.push(`/stores/${item?.id}/edit`)
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

export default StoreList;
