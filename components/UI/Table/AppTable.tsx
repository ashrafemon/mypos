import { AppTableType } from "@/lib/types/types";
import { Card, Checkbox, ScrollArea, Table, Text, Title } from "@mantine/core";
import React from "react";
import AppLoading from "../AppLoading";
import NoData from "../NoData";

const AppTable: React.FC<AppTableType> = ({
    headers = [],
    data,
    isFound = false,
    isLoading = false,
    isError = false,
    error,
    striped = true,
    highlightOnHover = true,
    withTableBorder = true,
    withColumnBorders = false,
    withRowBorders = false,
    stickyHeader = true,
    stickyHeaderOffset = -1,
    topContent,
    bottomContent,
    contentHeight = 540,
    contentWidth = 900,
    footer,
    ...props
}) => {
    return (
        <Card shadow="lg" withBorder radius="md">
            {topContent && <Card.Section p="md">{topContent}</Card.Section>}

            <Table.ScrollContainer minWidth={contentWidth} h={contentHeight}>
                <Table
                    striped={striped}
                    highlightOnHover={highlightOnHover}
                    withTableBorder={withTableBorder}
                    withColumnBorders={withColumnBorders}
                    withRowBorders={withRowBorders}
                    stickyHeader={stickyHeader}
                    stickyHeaderOffset={stickyHeaderOffset}
                    {...props}
                >
                    {headers.length > 0 && (
                        <Table.Thead classNames={{ thead: "z-10" }}>
                            <Table.Tr>
                                {headers.map((item) => (
                                    <Table.Td
                                        key={item.key}
                                        align={item.align ?? "left"}
                                        fw={600}
                                        maw={
                                            item.key === "checkbox"
                                                ? item.w
                                                    ? item.w
                                                    : 10
                                                : 150
                                        }
                                    >
                                        {item.key === "checkbox" ? (
                                            <Checkbox />
                                        ) : (
                                            item.label
                                        )}
                                    </Table.Td>
                                ))}
                            </Table.Tr>
                        </Table.Thead>
                    )}

                    <Table.Tbody>
                        {isError ? (
                            <Table.Tr>
                                <Table.Td
                                    colSpan={headers.length ?? 1}
                                    ta="center"
                                    c="red"
                                    p="lg"
                                >
                                    <Title component="h5" order={3}>
                                        {error.status}
                                    </Title>
                                    <Title component="h5" order={1}>
                                        {error.originalStatus}
                                    </Title>
                                    <Title component="h5" order={4}>
                                        {error.error}
                                    </Title>
                                </Table.Td>
                            </Table.Tr>
                        ) : isLoading || !isFound ? (
                            <Table.Tr>
                                <Table.Td colSpan={headers.length ?? 1}>
                                    {isLoading ? <AppLoading /> : <NoData />}
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            data
                        )}
                    </Table.Tbody>
                    {footer}
                </Table>
            </Table.ScrollContainer>

            {bottomContent && (
                <Card.Section p="md">{bottomContent}</Card.Section>
            )}
        </Card>
    );
};

export const AppTableRow = Table.Tr;
export const AppTableHeadCell = Table.Th;
export const AppTableCell = Table.Td;
export const AppTableFooter = Table.Tfoot;

export default AppTable;
