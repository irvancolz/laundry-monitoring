"use client";
import { LaundryBranch } from "@/type/laundry";
import {
  FormControlLabel,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Switch,
} from "@mui/material";
import Text from "./text";
import { MenuIcon } from "./icon/menu";
import {
  ChatBubbleOutlineOutlined,
  Close,
  DeleteOutline,
  EditOutlined,
  LocationOnOutlined,
  Save,
  Schedule,
} from "@mui/icons-material";
import { useState } from "react";
import { useModal } from "@/context/modal-ctx";
import { api } from "@/api";
import { useBottomDrawer } from "@/context/bottom-drawer-ctx";
import TextInput from "./text-input";
import Button from "./button";
import TimePicker from "./time-picker";
import Textarea from "./textarea";
import dayjs, { Dayjs } from "dayjs";
import { date } from "@/utils/date";

function UpdateBranchForm({ branch }: { branch: LaundryBranch }) {
  const drawer = useBottomDrawer();
  const modal = useModal();
  // beautiful isn't it?
  const [payload, setPayload] = useState<LaundryBranch>({
    ...branch,
    open_hour: dayjs()
      .set("hours", parseInt(branch.open_hour?.split(":")[0]!))
      .set(
        "minutes",
        parseInt(branch.open_hour?.split(":")[1]!)
      ) as unknown as string,
    close_hour: dayjs()
      .set("hours", parseInt(branch.close_hour?.split(":")[0]!))
      .set(
        "minutes",
        parseInt(branch.close_hour?.split(":")[1]!)
      ) as unknown as string,
  });

  function closeForm() {
    drawer.close();
  }

  function handleSubmit() {
    modal.confirm({
      title: "perbarui cabang",
      onAccept: () => updateBranch,
    });
  }

  async function updateBranch() {
    try {
      const updatePayload: LaundryBranch = {
        ...payload,
        // dont forget to format the open and close hour to string
        close_hour: date.formatTime(payload.close_hour as unknown as Dayjs),
        open_hour: date.formatTime(payload.open_hour as unknown as Dayjs),
      };
      api.laundryBranch.update(updatePayload);
      modal.notif("success", "cabang berhasil diperbaharui");
      closeForm();
    } catch (error) {
      modal.handleError(error);
    }
  }

  return (
    <Stack sx={{ gap: "1rem", minHeight: "50vh" }}>
      <Text component="h2" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Perbarui cabang
      </Text>
      <Stack sx={{ flexGrow: 1, gap: "1rem" }}>
        <TextInput
          label="nama cabang"
          placeholder="mangkubumi 1"
          value={payload.name}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Textarea
          placeholder="jl mangkubumi no 12a"
          value={payload.address!}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, address: e.target.value }))
          }
        />
        <TextInput
          label="nomor admin"
          value={payload.contact}
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="08123456789"
          slotProps={{
            htmlInput: {
              pattern: "[0-9s]{13,19}",
              maxLength: "19",
            },
          }}
          required
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, contact: e.target.value }))
          }
        />
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", gap: "1rem" }}
        >
          <TimePicker
            label="jam buka"
            value={payload.open_hour}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                open_hour: e,
              }));
            }}
          />
          <TimePicker
            label="jam tutup"
            value={payload.close_hour}
            onChange={(e) => {
              setPayload((prev) => ({
                ...prev,
                close_hour: e,
              }));
            }}
          />
        </Stack>
        <FormControlLabel
          label="Bisa proses pesanan ditempat"
          control={
            <Switch
              value={payload.is_washing_station}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  is_washing_station: e.target.checked,
                }))
              }
            />
          }
        />
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
          Perbarui Cabang
        </Button>
      </Stack>
    </Stack>
  );
}

export default function BranchCard(branch: LaundryBranch) {
  const modal = useModal();
  const drawer = useBottomDrawer();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUpdate = () => {
    drawer.setContent(<UpdateBranchForm branch={branch} />);
    drawer.open();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  async function deleteBranch() {
    try {
      await api.laundryBranch.delete(branch);
      modal.notif("success", "cabang berhasil dihapus");
    } catch (error) {
      modal.handleError(error);
    }
  }

  function handleDelete() {
    modal.confirm({
      title: "hapus cabang",
      onAccept: () => deleteBranch,
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
          <Text sx={{ fontSize: ".6rem" }}>{branch.code}</Text>
          <IconButton
            sx={{ padding: 0 }}
            id={`${branch.id}-menu-btn`}
            aria-controls={open ? `${branch.id}-menu` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
        <Text sx={{ fontWeight: 700, textTransform: "capitalize" }}>
          {branch.name}
        </Text>
        <Stack direction="row" sx={{ gap: ".5em" }}>
          <LocationOnOutlined
            sx={{ width: "1rem", height: "1rem", color: "primary.main" }}
          />
          <Text sx={{ fontSize: ".75rem" }}>{branch.address}</Text>
        </Stack>
        <Stack direction="row" sx={{ gap: ".5em" }}>
          <Schedule
            sx={{ width: "1rem", height: "1rem", color: "primary.main" }}
          />
          <Text sx={{ fontSize: ".75rem" }}>
            {branch.open_hour && branch.close_hour
              ? `${branch.open_hour} - ${branch.close_hour}`
              : "-"}
          </Text>
        </Stack>
        <Stack direction="row" sx={{ gap: ".5em" }}>
          <ChatBubbleOutlineOutlined
            sx={{ width: "1rem", height: "1rem", color: "primary.main" }}
          />
          <Text sx={{ fontSize: ".75rem" }}>{branch.contact || "-"}</Text>
        </Stack>
      </Stack>
      <Menu
        id={`${branch.id}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${branch.id}-menu-btn`,
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
