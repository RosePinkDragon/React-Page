import {
  Button,
  Checkbox,
  FormControlLabel,
  Menu,
  MenuItem,
} from "@mui/material";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";

import type { Person } from "../columns";

const ShowHideTable = ({ table }: { table: Table<Person> }) => {
  const {
    getIsAllColumnsVisible,
    getToggleAllColumnsVisibilityHandler,
    getAllLeafColumns,
  } = table;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        variant="contained"
        aria-describedby="basic-button"
        type="button"
        onClick={handleClick}
      >
        Toggle Columns
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <FormControlLabel
            control={
              <Checkbox
                {...{
                  checked: getIsAllColumnsVisible(),
                  onChange: getToggleAllColumnsVisibilityHandler(),
                }}
              />
            }
            label="Toggle All"
          />
        </MenuItem>
        {getAllLeafColumns().map((column) => {
          return (
            <MenuItem key={column.id}>
              <FormControlLabel
                htmlFor={column.id}
                label={column.id}
                control={
                  <Checkbox
                    id={column.id}
                    {...{
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />
                }
              />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ShowHideTable;
