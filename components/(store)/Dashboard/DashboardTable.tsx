"use client";

import AppPaginator from "@/components/UI/Table/AppPaginator";
import AppTable, {
    AppTableCell,
    AppTableRow,
} from "@/components/UI/Table/AppTable";
import { IValueType } from "@/lib/types/types";
import { Icon } from "@iconify/react";
import { ActionIcon, Button, Checkbox, Flex, Title } from "@mantine/core";
import { useState } from "react";

const DashboardTable = () => {
    const [queries, setQueries] = useState({
        page: 1,
        offset: 10,
    });

    const handleQueryChange = (field: string, value: IValueType) => {
        setQueries((prevState) => ({ ...prevState, [field]: value }));
    };

    return (
        <AppTable
            isFound={Array(10).fill(5).length > 0}
            isLoading={false}
            topContent={
                <Flex justify="space-between">
                    <Title component="h5" order={3}>
                        Master Dashboard
                    </Title>
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
            headers={[
                { key: "checkbox", label: "Checkbox", align: "center" },
                { key: "name", label: "Name" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
                { key: "action", label: "Action", align: "center" },
            ]}
            data={Array(10)
                .fill(1)
                .map((_, i) => (
                    <AppTableRow key={i}>
                        <AppTableCell>
                            <Checkbox />
                        </AppTableCell>
                        <AppTableCell>Ashraf</AppTableCell>
                        <AppTableCell>ashraf.emon143@gmail.com</AppTableCell>
                        <AppTableCell>01982411208</AppTableCell>
                        <AppTableCell>
                            <Flex gap="xs">
                                <ActionIcon size="lg" variant="light">
                                    <Icon icon="mdi:point-of-sale" width={18} />
                                </ActionIcon>
                                <ActionIcon size="lg" variant="light">
                                    <Icon icon="mdi:point-of-sale" width={18} />
                                </ActionIcon>
                                <ActionIcon size="lg" variant="light">
                                    <Icon icon="mdi:point-of-sale" width={18} />
                                </ActionIcon>
                            </Flex>
                        </AppTableCell>
                    </AppTableRow>
                ))}
        />
    );
};

export default DashboardTable;
