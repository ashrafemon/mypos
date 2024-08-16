"use client";

import { Flex, Pagination, Text } from "@mantine/core";
import { useMemo } from "react";
import SelectBox from "../SelectBox";
import { IValueType } from "@/lib/types/types";

const AppPaginator = ({
    page = 1,
    offset = 10,
    total = 100,
    totalPage = 1,
    actionHandler = (field: string, value: IValueType) => {},
}) => {
    const perPageOptions = useMemo(
        () => [
            { label: "10", value: "10" },
            { label: "20", value: "20" },
            { label: "50", value: "50" },
            { label: "100", value: "100" },
        ],
        []
    );

    return (
        <Flex align="center" justify="space-between" gap="xs">
            <Flex align="center" gap="xs">
                <SelectBox
                    placeholder="Per Page"
                    value={String(offset)}
                    data={perPageOptions}
                    size="xs"
                    w={80}
                    onChange={(value) => actionHandler("offset", value)}
                />
                <Text size="sm">Showing 1 to 1 of {total} entries</Text>
            </Flex>

            <Pagination
                size="sm"
                value={page}
                total={totalPage}
                onChange={(page) => actionHandler("page", page)}
            />
        </Flex>
    );
};

export default AppPaginator;
