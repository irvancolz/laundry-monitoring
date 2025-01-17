"use client";
import { LaundryBranch } from "@/type/laundry";
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
  ChatBubbleOutlineOutlined,
  Close,
  DeleteOutline,
  EditOutlined,
  Save,
  Schedule,
} from "@mui/icons-material";
import { useState } from "react";
import { useModal } from "@/context/modal-ctx";
import { api } from "@/api";
import { useBottomDrawer } from "@/context/bottom-drawer-ctx";
import TextInput from "./text-input";
import Button from "./button";
import Select from "./select";
import { Employee, Gender } from "@/type/employee";
import dayjs from "dayjs";

const genders: { label: Gender; value: Gender }[] = ["pria", "wanita"].map(
  (el) => ({ label: el, value: el })
) as { label: Gender; value: Gender }[];

function UpdateEmployeeForm({ employee }: { employee: Employee }) {
  const drawer = useBottomDrawer();
  const modal = useModal();
  const [payload, setPayload] = useState<Employee>(employee);

  function closeForm() {
    drawer.close();
  }

  function handleSubmit() {
    modal.confirm({
      title: "perbarui pegawai",
      onAccept: () => updateEmployee,
    });
  }

  async function updateEmployee() {
    try {
      const updatePayload: Employee = {
        ...payload,
      };
      api.employee.update(updatePayload);
      modal.notif("success", "pegawai berhasil diperbaharui");
      closeForm();
    } catch (error) {
      modal.handleError(error);
    }
  }

  return (
    <Stack sx={{ gap: "1rem", minHeight: "50vh" }}>
      <Text component="h2" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Perbarui Pegawai
      </Text>
      <Stack sx={{ flexGrow: 1, gap: "1rem" }}>
        <TextInput
          label="nama Pegawai"
          value={payload.name}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <Select
          label="Jenis Kelamin"
          value={payload.gender}
          option={genders}
          onChange={(e) =>
            setPayload((prev) => ({
              ...prev,
              gender: e.target.value as Gender,
            }))
          }
        />
        <TextInput
          label="nomor kontak"
          value={payload.contact}
          onChange={(e) =>
            setPayload((prev) => ({ ...prev, contact: e.target.value }))
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
          Perbarui Pegawai
        </Button>
      </Stack>
    </Stack>
  );
}

export default function EmployeeCard(employee: Employee) {
  const modal = useModal();
  const drawer = useBottomDrawer();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUpdate = () => {
    drawer.setContent(<UpdateEmployeeForm employee={employee} />);
    drawer.open();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(() => null);
  };

  async function deleteEmployee() {
    try {
      await api.employee.delete(employee);
      modal.notif("success", "pegawai berhasil dihapus");
    } catch (error) {
      modal.handleError(error);
    }
  }

  function handleDelete() {
    modal.confirm({
      title: "hapus pegawai",
      onAccept: () => deleteEmployee,
    });
  }

  const workTimeInYears = dayjs().diff(dayjs(employee.created_at), "years");
  const workTimeInDays = dayjs().diff(dayjs(employee.created_at), "days");
  const workTimeInMonths =
    dayjs().diff(dayjs(employee.created_at), "month") % 12;

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
          <Text sx={{ fontSize: ".6rem" }}>{employee.gender}</Text>
          <IconButton
            sx={{ padding: 0 }}
            id={`${employee.id}-menu-btn`}
            aria-controls={open ? `${employee.id}-menu` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
        <Text sx={{ fontWeight: 700, textTransform: "capitalize" }}>
          {employee.name}
        </Text>
        <Stack direction="row" sx={{ gap: ".5em" }}>
          <Schedule
            sx={{ width: "1rem", height: "1rem", color: "primary.main" }}
          />
          <Text sx={{ fontSize: ".75rem" }}>{`${
            workTimeInYears > 0 && `${workTimeInYears} tahun`
          } ${workTimeInMonths > 0 && `${workTimeInMonths} bulan`} ${
            workTimeInYears < 0 && workTimeInMonths < 0
              ? `${workTimeInDays} hari`
              : ""
          }`}</Text>
        </Stack>
        <Stack direction="row" sx={{ gap: ".5em" }}>
          <ChatBubbleOutlineOutlined
            sx={{ width: "1rem", height: "1rem", color: "primary.main" }}
          />
          <Text sx={{ fontSize: ".75rem" }}>{employee.contact || "-"}</Text>
        </Stack>
      </Stack>
      <Menu
        id={`${employee.id}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${employee.id}-menu-btn`,
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
