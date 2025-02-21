"use client";
import { LaundryService } from "@/type/laundry";
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
import {
  DeleteOutline,
  EditOutlined,
  PaidOutlined,
  Schedule,
} from "@mui/icons-material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/context/modal-ctx";
import { api } from "@/api";

export default function ServiceCard(service: LaundryService) {
  const router = useRouter();
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
      await api.laundryService.delete(service.id);
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
          <Text sx={{ fontSize: ".6rem" }}>{service.code}</Text>
          <IconButton
            sx={{ padding: 0 }}
            id={`${service.id}-menu-btn`}
            aria-controls={open ? `${service.id}-menu` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
        <Text sx={{ fontWeight: 700, textTransform: "capitalize" }}>
          {service.name}
        </Text>
        <Stack direction="row" sx={{ gap: ".5em" }}>
          <Schedule
            sx={{ width: "1rem", height: "1rem", color: "primary.main" }}
          />
          <Text sx={{ fontSize: ".75rem" }}>
            {service.service_time_hour || "-"} jam pengerjaan
          </Text>
        </Stack>
        <Stack direction="row" sx={{ gap: ".5em" }}>
          <PaidOutlined
            sx={{ width: "1rem", height: "1rem", color: "primary.main" }}
          />
          <Text sx={{ fontSize: ".75rem" }}>
            {new Intl.NumberFormat("id", {
              style: "currency",
              currency: "IDR",
            }).format(service.price || 0)}
            / {service.pricing_type == "weight" ? "kg" : "buah"}
          </Text>
        </Stack>
      </Stack>
      <Menu
        id={`${service.id}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${service.id}-menu-btn`,
        }}
        sx={{ padding: ".25rem" }}
      >
        <MenuList dense sx={{ padding: ".25rem" }}>
          <MenuItem
            onClick={() => router.push(`/laundry/service/${service.id}/update`)}
          >
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
