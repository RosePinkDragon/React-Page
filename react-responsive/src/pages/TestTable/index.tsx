import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import {
  getPaginationRowModel,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import React, { useState } from "react";

import TablePaginationActions from "./actions/TablePaginationAction";
import defaultColumns from "./columns";
import Filter from "./Filter";
import PaginationMenu from "./filters/PaginationMenu";
import ShowHideTable from "./filters/ShowHideTable";
import LoadingCover from "./LoadingCover";
import { fetchData } from "./makeData";

function Paginated() {
  // const [{ pageIndex, pageSize }, setPagination] =
  //   React.useState<PaginationState>({
  //     pageIndex: 0,
  //     pageSize: 10,
  //   });

  // const pagination = React.useMemo(
  //   () => ({
  //     pageIndex,
  //     pageSize,
  //   }),
  //   [pageIndex, pageSize]
  // );
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const [fetchDataOptions, setFetchDataOptions] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = useQuery({
    queryKey: ["data", fetchDataOptions],
    queryFn: () => fetchData(fetchDataOptions),
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: dataQuery.data?.rows ?? [],
    columns: defaultColumns,
    // pageCount: dataQuery.data?.pageCount ?? -1,
    state: {
      columnVisibility,
      // pagination,
    },
    onColumnVisibilityChange: setColumnVisibility,

    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    // manualPagination: true,
    getPaginationRowModel: getPaginationRowModel(),

    // getPaginationRowModel: getPaginationRowModel(),
    // If only doing manual pagination,
    // you don't need this
    debugTable: true,
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  return (
    <>
      <ShowHideTable table={table} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <PaginationMenu table={table} /> */}
      <TablePagination
        rowsPerPageOptions={[
          5,
          10,
          25,
          { label: "All", value: dataQuery.data?.rows.length || 0 },
        ]}
        component="div"
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={pageSize}
        page={pageIndex}
        SelectProps={{
          inputProps: { "aria-label": "Rows Per Page" },
          native: true,
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          table.setPageSize(size);
        }}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
}

export default Paginated;
