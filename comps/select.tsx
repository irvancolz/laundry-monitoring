import { Option } from "@/type/general";
import {
  Select as BaseSelect,
  MenuItem,
  type SelectProps,
} from "@mui/material";

export default function Select({
  option,
  ...rest
}: SelectProps & { option: Option[] }) {
  return (
    <BaseSelect {...rest}>
      {option.map((b, i) => {
        return (
          <MenuItem key={i} value={b.value}>
            {b.label}
          </MenuItem>
        );
      })}
    </BaseSelect>
  );
}
