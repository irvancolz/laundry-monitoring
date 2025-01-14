"use client";

import Button from "@/comps/button";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import { Close, Save } from "@mui/icons-material";
import { Paper, Stack } from "@mui/material";
import DatePicker from "@/comps/datepicker";
import Topbar from "@/comps/topbar";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LaundryService, OrderRequest } from "@/type/laundry";
import { Option } from "@/type/general";
import { api } from "@/api";
import Select from "@/comps/select";
import dayjs from "dayjs";
import { useModal } from "@/context/modal-ctx";
import Textarea from "@/comps/textarea";
import { date } from "@/utils/date";

export default function Page() {
  const { handleError } = useModal();
  const router = useRouter();
  const [data, setData] = useState<OrderRequest>({
    service_id: 0,
    branch_id: 0,
    customer_name: "",
  } as OrderRequest);
  const [branch, setBranch] = useState<Option[]>([]);
  const [services, setServices] = useState<LaundryService[]>([]);
  const [service, setService] = useState<LaundryService>();
  const totalPrice = (data.qty || 0) * (service?.price || 0);

  function resetForm() {
    setData(
      () =>
        ({
          service_id: 0,
          branch_id: 0,
          customer_name: "",
        } as OrderRequest)
    );
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const resp = await api.order.create(data);
      resetForm();
      router.push(`/order/${resp.id}/success`);
    } catch (error) {
      handleError(error);
    }
  }

  function handleCancel() {
    resetForm();
    redirect("/");
  }

  function handleQtyChange(qty: number) {
    if (qty < 0) return;
    setData((prev) => ({
      ...prev,
      qty: qty,
      price: qty * (service?.price || 0),
    }));
  }

  function handleServiceChange(newService: number) {
    if (services.length <= 0) return;
    const selectedService = services.find((el) => el.id == newService);
    if (selectedService == null) return;
    const currentTime = dayjs();
    setService(() => selectedService);
    const finish_expectation = date.formatDateTime(
      currentTime.add(selectedService.service_time_hour!, "h")
    );

    setData((prev) => ({
      ...prev,
      service_id: newService,
      created_at: date.formatDateTime(currentTime),
      finish_expectation: finish_expectation,
      price: prev.qty! * selectedService.price!,
    }));
  }

  useEffect(() => {
    async function getData() {
      const [branches, services] = await Promise.all([
        api.laundryBranch.getAll(),
        api.laundryService.getAll(),
      ]);
      setBranch(() => {
        return branches.map((el) => ({ value: el.id, label: el.name! }));
      });

      setServices(() => services);
    }

    getData();
  }, []);

  return (
    <>
      <Topbar />
      <form
        onSubmit={handleSubmit}
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Stack gap="1rem" flexGrow={1} marginTop="2rem">
          <Text variant="h1" fontSize="1.5rem" fontWeight={700}>
            Tambah Pesanan Baru
          </Text>
          <Select
            id="laundry-origin-select"
            label="counter"
            option={branch}
            defaultValue=""
            value={data.branch_id}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                branch_id: e.target.value as number,
              }));
            }}
          />
          <TextInput
            label="nama pelanggan"
            required
            value={data.customer_name}
            onChange={(e) =>
              setData((prev) => ({ ...prev, customer_name: e.target.value }))
            }
          />
          <Select
            label="tipe"
            defaultValue=""
            required
            value={data.service_id}
            option={services.map((el) => ({ value: el.id, label: el.name! }))}
            onChange={(e) =>
              handleServiceChange(e.target.value as unknown as number)
            }
          />
          <Stack direction="row" justifyContent="space-between" gap="1rem">
            <DatePicker
              label="tanggal masuk"
              defaultValue={dayjs(data.created_at)}
              value={dayjs(data.created_at)}
              disabled
            />
            <DatePicker
              label="tanggal selesai"
              defaultValue={dayjs(data.finish_expectation)}
              value={dayjs(data.finish_expectation)}
              disablePast
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  finish_expectation: date.formatDateTime(e),
                }))
              }
            />
          </Stack>
          <Stack direction="row" justifyContent="space-between" gap="1rem">
            <TextInput
              label={service?.pricing_type == "weight" ? "berat" : "jumlah"}
              type="number"
              onChange={(e) =>
                handleQtyChange(e.target.value as unknown as number)
              }
              value={data.qty}
              required
            />
            <TextInput
              label="harga"
              type="number"
              value={service?.price}
              disabled
            />
          </Stack>
          <Text fontSize="1.5rem" fontWeight={700}>
            {isNaN(totalPrice)
              ? "-"
              : new Intl.NumberFormat("id", {
                  style: "currency",
                  currency: "IDR",
                }).format(totalPrice)}
          </Text>
          <Textarea
            placeholder="catatan"
            value={data.notes!}
            onChange={(e) =>
              setData((prev) => ({ ...prev, notes: e.target.value }))
            }
          />
        </Stack>
        <Paper sx={{ position: "sticky", bottom: 0 }}>
          <Stack gap=".5rem">
            <Button
              startIcon={<Close />}
              type="button"
              onClick={handleCancel}
              variant="outlined"
            >
              Batalkan Pesanan
            </Button>
            <Button type="submit" startIcon={<Save />}>
              Tambahkan Pesanan
            </Button>
          </Stack>
        </Paper>
      </form>
    </>
  );
}
