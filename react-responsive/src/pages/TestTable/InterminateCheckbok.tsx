import { Checkbox } from "@mui/material";
import { useRef, useEffect } from "react";
import type { HTMLProps } from "react";

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current && typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate, rest.checked]);

  return <Checkbox checked={rest.checked} onChange={rest.onChange} />;
}

export default IndeterminateCheckbox;
