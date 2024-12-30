"use client";

import { api } from "@/api";
import BottomBar from "@/comps/bottom-bar";
import Button from "@/comps/button";
import Select from "@/comps/select";
import ServiceTaskSelector from "@/comps/service-task-selector";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import { useModal } from "@/context/modal-ctx";
import { LaundryServiceRequest, OrderTask } from "@/type/laundry";
import { date } from "@/utils/date";
import {
  CancelOutlined,
  LocalLaundryServiceOutlined,
} from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const modal = useModal();
  const [selectedTasks, setSelectedTasks] = useState<OrderTask[]>([]);
  const [payload, setPayload] = useState<LaundryServiceRequest>({
    created_at: date.currentTime(),
    price: 0,
    name: "",
    pricing_type: "",
    service_time_hour: 0,
  } as unknown as LaundryServiceRequest);

  const pricingTypes: { label: string; value: "weight" | "piece" }[] = [
    {
      label: "per kilo",
      value: "weight",
    },
    {
      label: "per potong",
      value: "piece",
    },
  ];

  async function submit() {
    try {
      await api.laundryService.create(payload, selectedTasks);
    } catch (error) {
      modal.handleError(error);
    }
  }

  return (
    <>
      <Topbar />
      <Stack sx={{ flexGrow: 1, marginTop: "2rem" }}>
        <Text component="h1" sx={{ fontWeight: 700, fontSize: "1.5rem" }}>
          Tambah Layanan Baru
        </Text>
        <Stack sx={{ flexGrow: 1, marginTop: "1.5rem", gap: "1rem" }}>
          <TextInput
            label="Nama"
            placeholder="Nama Layanan"
            value={payload.name}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <Select
            label="Jenis Pembayaran"
            value={payload.pricing_type}
            option={pricingTypes}
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                pricing_type: e.target.value as "weight" | "piece",
              }))
            }
          />
          <TextInput
            type="number"
            label="Harga"
            value={payload.price}
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                price: e.target.value as unknown as number,
              }))
            }
          />
          <TextInput
            type="number"
            label="Lama Pengerjaan"
            value={payload.service_time_hour}
            onChange={(e) =>
              setPayload((prev) => ({
                ...prev,
                service_time_hour: e.target.value as unknown as number,
              }))
            }
          />
          <Box sx={{ marginTop: "2rem" }}>
            <Text sx={{ fontWeight: 700 }}>Pilih Tugas</Text>
            <ServiceTaskSelector
              value={selectedTasks}
              onChange={setSelectedTasks}
            />
          </Box>
        </Stack>

        <BottomBar>
          <Button
            variant="outlined"
            onClick={() => router.back()}
            startIcon={<CancelOutlined />}
          >
            Batalkan Layanan
          </Button>
          <Button onClick={submit} startIcon={<LocalLaundryServiceOutlined />}>
            Tambah Layanan
          </Button>
        </BottomBar>
      </Stack>
    </>
  );
}
