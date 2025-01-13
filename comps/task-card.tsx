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
  TextareaAutosize,
} from "@mui/material";
import Text from "./text";
import { MenuIcon } from "./icon/menu";
import { Close, DeleteOutline, EditOutlined, Save } from "@mui/icons-material";
import { useState } from "react";
import { useModal } from "@/context/modal-ctx";
import { api } from "@/api";
import { useBottomDrawer } from "@/context/bottom-drawer-ctx";
import TextInput from "./text-input";
import Button from "./button";

function UpdateTaskForm({ task }: { task: OrderTask }) {
  const drawer = useBottomDrawer();
  const modal = useModal();
  const [payload, setPayload] = useState<OrderTask>(task);

  function closeForm() {
    setPayload({
      name: "",
      description: "",
    } as OrderTask);
    drawer.close();
  }

  async function handleSubmit() {
    try {
      api.orderTask.update(payload);
      modal.notif("success", "pekerjaan berhasil ditambahkan");
      closeForm();
    } catch (error) {
      modal.handleError(error);
    }
  }

  return (
    <Stack sx={{ gap: "1rem", minHeight: "50vh" }}>
      <Text component="h2" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Perbarui Pekerjaan
      </Text>
      <Stack sx={{ flexGrow: 1, gap: "1rem" }}>
        <TextInput
          label="nama pekerjaan"
          value={payload.name}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <TextareaAutosize
          placeholder="deskripsi"
          value={payload.description!}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, description: e.target.value }))
          }
        ></TextareaAutosize>
        <Text>* pekerjaan baru akan berada di urutan terbawah</Text>
      </Stack>
      <Stack gap=".5rem">
        <Button
          startIcon={<Close />}
          type="button"
          onClick={closeForm}
          variant="outlined"
        >
          Batalkan Pembaruan
        </Button>
        <Button startIcon={<Save />} onClick={handleSubmit}>
          Perbarui Pekerjaan
        </Button>
      </Stack>
    </Stack>
  );
}

export default function TaskCard(task: OrderTask) {
  const modal = useModal();
  const drawer = useBottomDrawer();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUpdate = () => {
    drawer.setContent(<UpdateTaskForm task={task} />);
    drawer.open();
    setAnchorEl(() => null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  async function deleteService() {
    try {
      await api.orderTask.delete(task);
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
          <MenuItem onClick={handleUpdate}>
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
