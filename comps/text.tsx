import { Typography, TypographyProps } from "@mui/material";

export default function Text({
  color = "textPrimary",
  ...rest
}: TypographyProps) {
  return <Typography color={color} {...rest} />;
}
