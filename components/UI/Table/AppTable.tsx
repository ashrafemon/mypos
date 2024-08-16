import { AppTableType } from "@/lib/types/types";
import { Card, Checkbox, ScrollArea, Table } from "@mantine/core";
import React from "react";
import Loading from "../Loading";
import NoData from "../NoData";

const AppTable: React.FC<AppTableType> = ({
    headers = [],
    data,
    isFound = false,
    isLoading = false,
    striped = true,
    highlightOnHover = true,
    withTableBorder = true,
    withColumnBorders = true,
    withRowBorders = true,
    stickyHeader = true,
    stickyHeaderOffset = 0,
    topContent,
    bottomContent,
    ...props
}) => {
    return (
        <Card shadow="lg" withBorder radius="md">
            {topContent && <Card.Section p="md">{topContent}</Card.Section>}

            <ScrollArea offsetScrollbars h={540}>
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
                        <Table.Thead>
                            <Table.Tr>
                                {headers.map((item) => (
                                    <Table.Th
                                        key={item.key}
                                        align={item.align ?? "left"}
                                        miw={item.key === "checkbox" ? 10 : 150}
                                    >
                                        {item.key === "checkbox" ? (
                                            <Checkbox />
                                        ) : (
                                            item.label
                                        )}
                                    </Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>
                    )}

                    <Table.Tbody>
                        {isLoading || !isFound ? (
                            <Table.Tr>
                                <Table.Td colSpan={headers.length ?? 1}>
                                    {isLoading ? <Loading /> : <NoData />}
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            data
                        )}
                    </Table.Tbody>
                </Table>
            </ScrollArea>

            {bottomContent && (
                <Card.Section p="md">{bottomContent}</Card.Section>
            )}
        </Card>
    );
};

export const AppTableRow = Table.Tr;
export const AppTableCell = Table.Td;

export default AppTable;
