import { Button, MenuItem, OutlinedInput, Select } from "@mui/material";
import type { Table } from "@tanstack/react-table";

import type { Person } from "../columns";

const PaginationMenu = ({ table }: { table: Table<Person> }) => {
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </Button>
      <Button
        variant="contained"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </Button>
      <Button
        variant="contained"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </Button>
      <Button
        variant="contained"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </Button>
      <br />
      <span className="flex items-center gap-1">
        Page
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <OutlinedInput
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="border p-1 rounded w-16"
        />
      </span>
      <Select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((newPageSize) => (
          <MenuItem key={newPageSize} value={newPageSize}>
            Show {newPageSize}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default PaginationMenu;
