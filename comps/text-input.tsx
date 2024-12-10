import { TextField, TextFieldProps } from "@mui/material";

export default function TextInput(props: TextFieldProps) {
  return (
    <TextField
      variant="filled"
      color="primary"
      fullWidth
      size="small"
      {...props}
    />
  );
}
