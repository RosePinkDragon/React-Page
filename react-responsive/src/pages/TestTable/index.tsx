import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import React from "react";

import defaultColumns from "./columns";
import PaginationMenu from "./filters/PaginationMenu";
import ShowHideTable from "./filters/ShowHideTable";
import LoadingCover from "./LoadingCover";
import { fetchData } from "./makeData";

function Paginated() {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };

  const dataQuery = useQuery({
    queryKey: ["data", fetchDataOptions],
    queryFn: () => fetchData(fetchDataOptions),
    keepPreviousData: true,
  });

  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns: defaultColumns,
    pageCount: dataQuery.data?.pageCount ?? -1,
    state: {
      columnVisibility,
      pagination,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // If only doing manual pagination, you don't need this
    // getPaginationRowModel: getPaginationRowModel()
    // debugTable: true,
  });

  return (
    <Box>
      <ShowHideTable table={table} />
      <Table>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {dataQuery.isFetching ? <LoadingCover /> : null}
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
      <PaginationMenu table={table} />
    </Box>
  );
}

export default Paginated;
