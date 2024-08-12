"use client";

import Loading from "@/components/UI/Loading";
import TablePaginator from "@/components/UI/Table/TablePaginator";
import { TableBodyProperties, TableProperties } from "@/lib/constants/Property";
import {
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React from "react";

const DashboardTable = () => {
    return (
        <Table {...TableProperties} bottomContent={<TablePaginator />}>
            <TableHeader
                columns={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { key: "phone", label: "Phone" },
                    // { key: "action", label: "Action" },
                ]}
            >
                {(header) => (
                    <TableColumn key={header.key}>{header.label}</TableColumn>
                )}
            </TableHeader>
            <TableBody {...TableBodyProperties} loadingContent={<Loading />}>
                <TableRow key="1">
                    <TableCell>Tony Reichert</TableCell>
                    <TableCell>CEO</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="2">
                    <TableCell>Zoey Lang</TableCell>
                    <TableCell>Technical Lead</TableCell>
                    <TableCell>Paused</TableCell>
                </TableRow>
                <TableRow key="3">
                    <TableCell>Jane Fisher</TableCell>
                    <TableCell>Senior Developer</TableCell>
                    <TableCell>Active</TableCell>
                </TableRow>
                <TableRow key="4">
                    <TableCell>William Howard</TableCell>
                    <TableCell>Community Manager</TableCell>
                    <TableCell>Vacation</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default DashboardTable;
