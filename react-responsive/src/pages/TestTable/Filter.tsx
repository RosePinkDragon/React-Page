/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputBase } from "@mui/material";
import type { Table as ReactTable, Column } from "@tanstack/react-table";

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: ReactTable<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <div className="flex space-x-2">
      <InputBase
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            e.target.value,
            old?.[1],
          ])
        }
        placeholder="Min"
        className="w-24 border shadow rounded"
      />
      <InputBase
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ""}
        onChange={(e) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            e.target.value,
          ])
        }
        placeholder="Max"
        className="w-24 border shadow rounded"
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  ) : (
    <InputBase
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder="Search..."
      className="w-36 border shadow rounded"
      inputProps={{ "aria-label": "search" }}
    />
  );
}

export default Filter;
