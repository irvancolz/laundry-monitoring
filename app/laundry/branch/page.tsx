"use client";
import { api } from "@/api";
import BranchCard from "@/comps/branch-card";
import Button from "@/comps/button";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import Textarea from "@/comps/textarea";
import TimePicker from "@/comps/time-picker";
import Topbar from "@/comps/topbar";
import { useBottomDrawer } from "@/context/bottom-drawer-ctx";
import { useModal } from "@/context/modal-ctx";
import { LaundryBranch, LaundryBranchRequest } from "@/type/laundry";
import { date } from "@/utils/date";
import { Close, Save } from "@mui/icons-material";
import { FormControlLabel, Stack, Switch } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

function CreateBranchForm() {
  const drawer = useBottomDrawer();
  const modal = useModal();
  const [payload, setPayload] = useState<LaundryBranchRequest>({
    name: "",
    address: "",
    contact: "",
    is_washing_station: false,
    open_hour: dayjs(),
    close_hour: dayjs(),
  } as unknown as LaundryBranchRequest);

  function closeForm() {
    setPayload({
      name: "",
      address: "",
      contact: "",
      is_washing_station: false,
      open_hour: dayjs(),
      close_hour: dayjs(),
    } as unknown as LaundryBranchRequest);
    drawer.close();
  }

  async function handleSubmit() {
    try {
      const branchPayload: LaundryBranchRequest = {
        ...payload,
        // dont forget to format the open and close hour to string
        close_hour: date.formatTime(payload.close_hour as unknown as Dayjs),
        open_hour: date.formatTime(payload.open_hour as unknown as Dayjs),
      };
      api.laundryBranch.create(branchPayload);
      modal.notif("success", "cabang berhasil ditambahkan");
      closeForm();
    } catch (error) {
      modal.handleError(error);
    }
  }

  return (
    <Stack sx={{ gap: "1rem", minHeight: "50vh" }}>
      <Text component="h2" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Tambah Cabang
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
          Batalkan
        </Button>
        <Button startIcon={<Save />} onClick={handleSubmit}>
          Tambah Cabang
        </Button>
      </Stack>
    </Stack>
  );
}

export default function Page() {
  const drawer = useBottomDrawer();
  const [branches, setBranches] = useState<LaundryBranch[]>([]);
  const [query, setQuery] = useState<string>("");

  function handleAddTask() {
    drawer.setContent(<CreateBranchForm />);
    drawer.open();
  }

  useEffect(() => {
    async function getBranches() {
      const resp = await api.laundryBranch.getAll();
      setBranches(() => resp);
    }

    getBranches();
  }, []);
  return (
    <>
      <Topbar />
      <Stack sx={{ flexGrow: 1, gap: "1rem", marginTop: "2rem" }}>
        <Text
          variant="h1"
          component="h1"
          sx={{ fontSize: "1.5rem", fontWeight: 700 }}
        >
          Daftar Cabang
        </Text>
        <Stack direction="row" sx={{ gap: "1rem" }}>
          <TextInput
            placeholder="mangkubumi 1"
            value={query}
            onChange={(e) => setQuery(() => e.target.value)}
          />
          <Button variant="outlined" onClick={handleAddTask}>
            Tambah
          </Button>
        </Stack>
        <Stack sx={{ gap: "1rem" }}>
          {branches
            .filter((el) =>
              el.name?.toLowerCase().includes(query.toLowerCase())
            )
            .map((branch) => {
              return <BranchCard key={branch.id} {...branch} />;
            })}
        </Stack>
      </Stack>
    </>
  );
}
