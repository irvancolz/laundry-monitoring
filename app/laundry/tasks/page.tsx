"use client";
import { api } from "@/api";
import Button from "@/comps/button";
import TaskCard from "@/comps/task-card";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import { useBottomDrawer } from "@/context/bottom-drawer-ctx";
import { useModal } from "@/context/modal-ctx";
import { OrderTask, OrderTaskRequest } from "@/type/laundry";
import { Close, Save } from "@mui/icons-material";
import { Stack, TextareaAutosize } from "@mui/material";
import { useEffect, useState } from "react";

function CreateTaskForm() {
  const drawer = useBottomDrawer();
  const modal = useModal();
  const [payload, setPayload] = useState<OrderTaskRequest>({
    name: "",
    description: "",
  } as OrderTaskRequest);

  function closeForm() {
    setPayload({
      name: "",
      description: "",
    } as OrderTaskRequest);
    drawer.close();
  }

  async function handleSubmit() {
    try {
      api.orderTask.create(payload);
      modal.notif("success", "pekerjaan berhasil ditambahkan");
      closeForm();
    } catch (error) {
      modal.handleError(error);
    }
  }

  return (
    <Stack sx={{ gap: "1rem", minHeight: "50vh" }}>
      <Text component="h2" sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
        Tambah Pekerjaan
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
          Batalkan
        </Button>
        <Button startIcon={<Save />} onClick={handleSubmit}>
          Tambah Pekerjaan
        </Button>
      </Stack>
    </Stack>
  );
}

export default function Page() {
  const drawer = useBottomDrawer();
  const [tasks, setTasks] = useState<OrderTask[]>([]);
  const [query, setQuery] = useState<string>("");

  function handleAddTask() {
    drawer.setContent(<CreateTaskForm />);
    drawer.open();
  }

  useEffect(() => {
    async function getTasks() {
      const resp = await api.orderTask.getAll();
      setTasks(() => resp);
    }

    getTasks();
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
          Daftar Pekerjaan
        </Text>
        <Stack direction="row" sx={{ gap: "1rem" }}>
          <TextInput
            placeholder="pencucian layanan"
            value={query}
            onChange={(e) => setQuery(() => e.target.value)}
          />
          <Button variant="outlined" onClick={handleAddTask}>
            Tambah
          </Button>
        </Stack>
        <Text>* Seret untuk mengatur urutan pekerjaan</Text>
        <Stack sx={{ gap: "1rem" }}>
          {tasks
            .filter((el) =>
              el.name?.toLowerCase().includes(query.toLowerCase())
            )
            .map((task) => {
              return <TaskCard key={task.id} {...task} />;
            })}
        </Stack>
      </Stack>
    </>
  );
}
