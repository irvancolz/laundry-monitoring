import { TextareaAutosize, TextareaAutosizeProps } from "@mui/material";

export default function Textarea({ ...rest }: TextareaAutosizeProps) {
  return <TextareaAutosize {...rest} />;
}
