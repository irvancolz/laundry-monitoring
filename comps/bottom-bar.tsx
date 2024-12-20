import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function BottomBar({ children }: { children: ReactNode }) {
  return (
    <Stack
      sx={{
        gap: ".5rem",
        background: "#fff",
        paddingInline: "1.5rem",
        paddingBlock: "1.5rem 1rem",
        position: "sticky",
        left: 0,
        bottom: "1rem",
        width: "100vw",
        translate: "-1.5rem 1.5rem",
        borderRadius: ".75rem .75rem 0 0",
      }}
    >
      {children}
    </Stack>
  );
}
