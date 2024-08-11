"use client";

import {
    Pagination,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React from "react";

const AppTable: React.FC<TableType> = ({
    headers = [],
    hideHeader = false,
    isHeaderSticky = true,
    isStriped = false,
    isCompact = false,
    fullWidth = true,
    radius = "sm",
    emptyContent = "No data found...",
    topContent,
    bottomContent,
    topContentPlacement = "inside",
    bottomContentPlacement = "inside",
    body,
    isLoading = false,
}) => {
    return (
        <div>
            <Table
                color="default"
                selectionMode="multiple"
                defaultSelectedKeys={[]}
                hideHeader={hideHeader}
                isHeaderSticky={isHeaderSticky}
                isStriped={isStriped}
                isCompact={isCompact}
                fullWidth={fullWidth}
                radius={radius}
                topContentPlacement={topContentPlacement}
                bottomContentPlacement={bottomContentPlacement}
                {...(bottomContent ? { bottomContent: bottomContent } : {})}
                {...(topContent ? { topContent: topContent } : {})}
            >
                <TableHeader columns={headers}>
                    {(header) => (
                        <TableColumn key={header.key}>
                            {header.label}
                        </TableColumn>
                    )}
                </TableHeader>

                {body}
            </Table>
        </div>
    );
};

export default AppTable;
