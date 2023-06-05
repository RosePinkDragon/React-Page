import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import type { Table } from "@tanstack/react-table";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

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
      <IconButton
        aria-describedby="basic-button"
        type="button"
        onClick={handleClick}
        color="primary"
      >
        <FaFilter />
      </IconButton>

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
