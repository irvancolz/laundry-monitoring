"use client";
import { useBottomDrawer } from "@/context/bottom-drawer-ctx";
import { Close } from "@mui/icons-material";
import { Box, Drawer, IconButton, Stack } from "@mui/material";

export default function BottomDrawer() {
  const { opened, close, content } = useBottomDrawer();
  return (
    <Drawer
      anchor="bottom"
      open={opened}
      sx={[
        {
          ".MuiDrawer-paper": {
            borderRadius: "1rem 1rem 0 0 ",
          },
        },
      ]}
      onClose={close}
    >
      <Box sx={{ padding: "1.5rem 1.5rem" }}>
        <Stack direction="row" sx={{ justifyContent: "flex-end", mb: "1rem" }}>
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </Stack>
        <div>{content}</div>
      </Box>
    </Drawer>
  );
}
