import AppTable from "@/components/UI/AppTable";
import { TableBody, TableCell, TableRow } from "@nextui-org/react";
import React from "react";

const page = () => {
    return (
        <div>
            <h4>Master Dashboard</h4>
            <AppTable
                headers={[
                    { key: "name", label: "Name" },
                    { key: "email", label: "Email" },
                    { key: "phone", label: "Phone" },
                ]}
                body={
                    <TableBody
                    // emptyContent={emptyContent}
                    // loadingContent={<Spinner label="Loading..." />}
                    // isLoading={isLoading}
                    >
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
                }
            />
        </div>
    );
};

export default page;
