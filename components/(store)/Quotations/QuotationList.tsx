"use client";

import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import TextField from "@/components/UI/TextField";
import { QuotationType } from "@/lib/models/Quotation";
import { AppTableHeaderOptionsType, IValueType } from "@/lib/types/types";
import { message, promptMessage } from "@/lib/utils/helper";
import {
    useDeleteQuotationMutation,
    useFetchQuotationsQuery,
} from "@/states/actions/stores/quotations";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Checkbox, Flex, Title } from "@mantine/core";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const QuotationList = () => {
    const router = useRouter();
    const headers: AppTableHeaderOptionsType[] = useMemo(
        () => [
            { key: "checkbox", label: "Checkbox", align: "center" },
            // { key: "ref_no", label: "Ref. No" },
            { key: "invoice_no", label: "Invoice No" },
            { key: "date", label: "Date" },
            { key: "total", label: "Total" },
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

    const { data, isFetching, isError, error } = useFetchQuotationsQuery(
        `offset=${queries.page}&limit=${queries.offset}${
            queries.search ? `&search=${queries.search}` : ""
        }`
    );

    const [deleteQuotation, result] = useDeleteQuotationMutation();
    const deleteHandler = (id: string | any) => {
        promptMessage(async () => {
            try {
                const payload = await deleteQuotation(id).unwrap();
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

    return (
        <AppTable
            isFound={data?.data?.length > 0}
            isLoading={isFetching}
            isError={isError}
            error={error}
            topContent={
                <Flex justify="space-between" gap="xs">
                    <Title component="h5" order={3}>
                        Quotation List
                    </Title>

                    <TextField
                        placeholder="Search Quotation"
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
                            onClick={() => router.push("/quotations/create")}
                        >
                            Add Quotation
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
            data={data?.data?.map((item: QuotationType, i: number) => (
                <AppTableRow key={i}>
                    <AppTableCell>
                        <Checkbox />
                    </AppTableCell>
                    {/* <AppTableCell>{item.refNo || "N/A"}</AppTableCell> */}
                    <AppTableCell>{item.invoiceNo || "N/A"}</AppTableCell>
                    <AppTableCell>
                        {item.date
                            ? moment(item.date).format("Do MM, YYYY")
                            : "N/A"}
                    </AppTableCell>
                    <AppTableCell>{item.total}</AppTableCell>
                    <AppTableCell>{item.status}</AppTableCell>
                    <AppTableCell>
                        <Flex gap="xs" justify="center">
                            <ActionIcon
                                size="lg"
                                variant="light"
                                loading={result.isLoading}
                            >
                                <Icon icon="carbon:view-filled" width={18} />
                            </ActionIcon>
                            <ActionIcon
                                size="lg"
                                variant="light"
                                color="orange"
                                loading={result.isLoading}
                                onClick={() =>
                                    router.push(`/quotations/${item.id}/edit`)
                                }
                            >
                                <Icon icon="weui:pencil-filled" width={18} />
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
    );
};

export default QuotationList;
