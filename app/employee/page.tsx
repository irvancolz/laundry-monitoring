"use client";
import { api } from "@/api";
import BottomDrawer from "@/comps/bottom-drawer";
import Button from "@/comps/button";
import EmployeeCard from "@/comps/employee-card";
import Select from "@/comps/select";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import { useBottomDrawer } from "@/context/bottom-drawer-ctx";
import { useModal } from "@/context/modal-ctx";
import { Employee, EmployeeRequest, Gender } from "@/type/employee";
import { Close, Save } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

const genders: { label: Gender; value: Gender }[] = ["pria", "wanita"].map(
  (el) => ({ label: el, value: el })
) as { label: Gender; value: Gender }[];

function CreateEmployeeForm() {
  const drawer = useBottomDrawer();
  const modal = useModal();
  const [payload, setPayload] = useState<EmployeeRequest>({
    name: "",
    contact: "",
    gender: "pria",
  } as EmployeeRequest);

  function closeForm() {
    setPayload({
      name: "",
      contact: "",
      gender: "pria",
    } as EmployeeRequest);
    drawer.close();
  }

  async function handleSubmit() {
    try {
      api.employee.create(payload);
      modal.notif("success", "pegawai berhasil ditambahkan");
      closeForm();
    } catch (error) {
      modal.handleError(error);
    }
  }

  return (
    <Stack sx={{ gap: "1rem", minHeight: "50vh" }}>
      <Text component="h2" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Tambah Pegawai
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
          Batalkan
        </Button>
        <Button startIcon={<Save />} onClick={handleSubmit}>
          Tambah Pegawai
        </Button>
      </Stack>
    </Stack>
  );
}

export default function Page() {
  const modal = useModal();
  const drawer = useBottomDrawer();
  const [query, setQuery] = useState<string>("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  const handleAdd = () => {
    drawer.setContent(<CreateEmployeeForm />);
    drawer.open();
  };

  useEffect(() => {
    async function getEmployees() {
      const resp = await api.employee.getAll();
      setEmployees(resp);
    }
    getEmployees();
  }, []);

  return (
    <>
      <Topbar />
      <BottomDrawer />
      <Stack sx={{ flexGrow: 1, gap: "1rem", marginTop: "2rem" }}>
        <Text
          variant="h1"
          component="h1"
          sx={{ fontSize: "1.5rem", fontWeight: 700 }}
        >
          Daftar Pegawai
        </Text>
        <Stack direction="row" sx={{ gap: "1rem" }}>
          <TextInput
            placeholder="budi rahmat"
            value={query}
            onChange={(e) => setQuery(() => e.target.value)}
          />
          <Button variant="outlined" onClick={handleAdd}>
            Tambah
          </Button>
        </Stack>
        <Stack sx={{ gap: "1rem" }}>
          {employees
            .filter((el) =>
              el.name?.toLowerCase().includes(query.toLowerCase())
            )
            .map((employee) => {
              return <EmployeeCard key={employee.id} {...employee} />;
            })}
        </Stack>
      </Stack>
    </>
  );
}
