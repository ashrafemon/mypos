"use client";

import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { SupplierType } from "@/lib/models/Supplier";
import { AppTableHeaderOptionsType, IValueType } from "@/lib/types/types";
import { useFetchSuppliersQuery } from "@/states/actions/stores/suppliers";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Checkbox, Flex, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const SupplierList = () => {
    const router = useRouter();

    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "checkbox", label: "Checkbox", align: "center" },
            { key: "name", label: "Name" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "contact_person", label: "Contact Person" },
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

    const { data, isFetching, isError, error } = useFetchSuppliersQuery(
        `offset=${queries.page}&limit=${queries.offset}${
            queries.search ? `&search=${queries.search}` : ""
        }`
    );

    console.log(error);

    return (
        <AppTable
            isFound={data?.data?.length > 0}
            isLoading={isFetching}
            isError={isError}
            error={error}
            topContent={
                <Flex justify="space-between" gap="xs">
                    <Title component="h5" order={3}>
                        Supplier List
                    </Title>

                    <TextField
                        placeholder="Search Supplier"
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
                            onClick={() => router.push("/suppliers/create")}
                        >
                            Add Supplier
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
            data={data?.data?.map((item: SupplierType, i: number) => (
                <AppTableRow key={i}>
                    <AppTableCell>
                        <Checkbox />
                    </AppTableCell>
                    <AppTableCell>{item.name || "N/A"}</AppTableCell>
                    <AppTableCell>{item.email || "N/A"}</AppTableCell>
                    <AppTableCell>{item.phone || "N/A"}</AppTableCell>
                    <AppTableCell>
                        {item?.contactPerson?.name || "N/A"}
                    </AppTableCell>
                    <AppTableCell>
                        <Flex gap="xs" justify="center">
                            <ActionIcon size="lg" variant="light">
                                <Icon icon="carbon:view-filled" width={18} />
                            </ActionIcon>
                            <ActionIcon
                                size="lg"
                                variant="light"
                                color="orange"
                                onClick={() =>
                                    router.push(`/suppliers/${item.id}/edit`)
                                }
                            >
                                <Icon icon="weui:pencil-filled" width={18} />
                            </ActionIcon>
                            <ActionIcon size="lg" variant="light" color="red">
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

export default SupplierList;
