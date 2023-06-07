import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { rankItem } from "@tanstack/match-sorter-utils";
import type { RankingInfo } from "@tanstack/match-sorter-utils";
import { useQuery } from "@tanstack/react-query";
import {
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type {
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import React, { useState } from "react";

import defaultColumns from "./columns";
import DebouncedInput from "./DebouncedInput";
import PaginationMenu from "./filters/PaginationMenu";
import ShowHideTable from "./filters/ShowHideTable";
import LoadingCover from "./LoadingCover";
import { fetchData } from "./makeData";

// declare module "@tanstack/table-core" {
//   interface FilterFns {
//     fuzzy: FilterFn<unknown>;
//   }
//   interface FilterMeta {
//     itemRank: RankingInfo;
//   }
// }
// refer this for more
// https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/filters?from-embed=&file=/src/main.tsx

const fuzzyFilter = (
  row: { getValue: (arg0: any) => any },
  columnId: any,
  value: string,
  addMeta: (arg0: { itemRank: RankingInfo }) => void
) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta  
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function Paginated() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

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

  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns: defaultColumns,
    pageCount: dataQuery.data?.pageCount ?? -1,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnVisibility,
      pagination,
      globalFilter,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,

    // If only doing manual pagination, you don't need this
    // getPaginationRowModel: getPaginationRowModel()
    // debugTable: true,
  });

  React.useEffect(() => {
    if (
      table.getState().columnFilters[0]?.id === "fullName" &&
      table.getState().sorting[0]?.id !== "fullName"
    ) {
      table.setSorting([{ id: "fullName", desc: false }]);
    }
  }, [table]);

  return (
    <Box>
      {/* filters */}
      <div>
        <DebouncedInput
          value={globalFilter ?? ""}
          onChange={(value) => setGlobalFilter(String(value))}
          className="p-2 font-lg shadow border border-block"
          placeholder="Search all columns..."
        />
      </div>
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
