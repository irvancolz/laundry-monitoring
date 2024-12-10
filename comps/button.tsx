import { ButtonProps, Button as ButtonBase } from "@mui/material";

export default function Button(props: ButtonProps) {
  return (
    <ButtonBase
      variant="contained"
      sx={{ textTransform: "capitalize" }}
      {...props}
    />
  );
}
