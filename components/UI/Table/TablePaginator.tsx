import { Pagination } from "@nextui-org/react";
import React from "react";

const TablePaginator = ({ page = 1, total = 1 }) => {
    return (
        <div className="flex w-full justify-between items-center">
            <div>
                <p className="text-sm">Showing 1 to 1 of 1 entries</p>
            </div>

            <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={total}
                // onChange={(page) => setPage(page)}
            />
        </div>
    );
};

export default TablePaginator;
