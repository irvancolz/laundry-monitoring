"use client";
import { Order } from "@/type/laundry";
import Text from "./text";
import {
  Box,
  Chip,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { DeleteOutlined, StartOutlined } from "@mui/icons-material";
import { useModal } from "@/context/modal-ctx";
import { MenuIcon } from "./icon/menu";
import { api } from "@/api";

export default function OrderCard({ order }: { order: Order }) {
  const modal = useModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  async function cancelOrder() {
    try {
      await api.order.cancel(order.id);
      modal.notif("success", "pesanan berhasil dibatalkan");
    } catch (error) {
      modal.handleError(error);
    }
  }

  function handleDelete(event: React.MouseEvent) {
    event.stopPropagation();
    modal.confirm({
      title: "batalkan pesanan",
      onAccept: () => cancelOrder,
    });
  }

  return (
    <>
      <Box sx={{ p: ".75rem", backgroundColor: "#fff", borderRadius: ".4rem" }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            marginBottom: ".5rem",
          }}
        >
          <Chip
            variant="outlined"
            size="small"
            sx={{
              borderRadius: ".25rem",
              fontWeight: 700,
              borderColor: "primary.main",
              fontSize: ".7rem",
              color: "primary.main",
            }}
            label={order.current_progress}
          />
          {order.status == "onprogress" && (
            <IconButton
              sx={{ padding: 0 }}
              id={`${order.id}-menu-btn`}
              aria-controls={open ? `${order.id}-menu` : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Stack>
        <Text
          sx={{
            color: "primary.main",
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          {order.customer_name}
        </Text>

        <Text sx={{ color: "primary.main", fontSize: ".9rem" }}>
          {order.service_name}
        </Text>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-end",
            mt: ".5rem",
          }}
        >
          <Text sx={{ fontSize: ".6rem", color: "primary.main" }}>
            {order.code}
          </Text>
          <Text sx={{ fontSize: ".6rem", color: "primary.main" }}>
            {dayjs(order.created_at).format("DD MMM YYYY")}
          </Text>
        </Stack>
      </Box>
      <Menu
        id={`${order.id}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${order.id}-menu-btn`,
        }}
        sx={{ padding: ".25rem" }}
      >
        <MenuList dense sx={{ padding: ".25rem" }}>
          <MenuItem>
            <ListItemIcon>
              <StartOutlined sx={{ color: "primary.main" }} />
            </ListItemIcon>
            <ListItemText>Lanjutkan</ListItemText>
          </MenuItem>
          <MenuItem sx={{ color: "error.main" }} onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutlined sx={{ color: "error.main" }} />
            </ListItemIcon>
            <ListItemText>Batalkan</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
