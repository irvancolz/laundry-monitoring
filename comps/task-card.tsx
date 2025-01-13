"use client";
import { OrderTask } from "@/type/laundry";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import Text from "./text";
import { MenuIcon } from "./icon/menu";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useModal } from "@/context/modal-ctx";
import { api } from "@/api";

export default function TaskCard(task: OrderTask) {
  const modal = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  async function deleteService() {
    try {
      await api.laundryService.delete(task.id);
      modal.notif("success", "layanan berhasil dihapus");
    } catch (error) {
      modal.handleError(error);
    }
  }

  function handleDelete() {
    modal.confirm({
      title: "hapus layanan",
      onAccept: () => deleteService,
    });
  }

  return (
    <>
      <Stack
        sx={{
          p: ".75rem",
          backgroundColor: "#fff",
          borderRadius: ".4rem",
          gap: ".25rem",
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text sx={{ fontSize: ".6rem" }}>{task.code}</Text>
          <IconButton
            sx={{ padding: 0 }}
            id={`${task.id}-menu-btn`}
            aria-controls={open ? `${task.id}-menu` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
        <Text sx={{ fontWeight: 700, textTransform: "capitalize" }}>
          {task.name}
        </Text>
        <Text>{task.description}</Text>
      </Stack>
      <Menu
        id={`${task.id}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${task.id}-menu-btn`,
        }}
        sx={{ padding: ".25rem" }}
      >
        <MenuList dense sx={{ padding: ".25rem" }}>
          <MenuItem>
            <ListItemIcon>
              <EditOutlined sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>
          <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutline sx={{ color: "error.main" }} />
            </ListItemIcon>
            <ListItemText>Hapus</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
