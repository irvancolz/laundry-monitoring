"use client";

import Button from "@/comps/button";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import { Close, Save } from "@mui/icons-material";
import { Paper, Stack, TextareaAutosize } from "@mui/material";
import DatePicker from "@/comps/datepicker";
import Topbar from "@/comps/topbar";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { LaundryService, LaundryType, OrderRequest } from "@/type/laundry";
import { Option } from "@/type/general";
import { api } from "@/api";
import Select from "@/comps/select";
import dayjs from "dayjs";

export default function Page() {
  const [data, setData] = useState<OrderRequest>({
    type: "",
    origin: "",
    customer_name: "",
  } as OrderRequest);
  const [branch, setBranch] = useState<Option[]>([]);
  const [services, setServices] = useState<LaundryService[]>([]);
  const [service, setService] = useState<LaundryService>();
  const totalPrice = (data.weight || 0) * (service?.price || 0);

  function resetForm() {
    setData(
      () =>
        ({
          type: "",
          origin: "",
          customer_name: "",
        } as OrderRequest)
    );
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      await api.order.create(data);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancel() {
    resetForm();
    redirect("/");
  }

  function handleWeightChange(weight: number) {
    setData((prev) => ({
      ...prev,
      weight: weight,
      price: weight * (service?.price || 0),
    }));
  }

  function handleQtyChange(qty: number) {
    setData((prev) => ({
      ...prev,
      qty: qty,
      price: qty * (service?.price || 0),
    }));
  }

  function handleServiceChange(newService: LaundryType) {
    if (services.length <= 0) return;
    const selectedService = services.find((el) => el.code == newService);
    if (!selectedService) return;
    const currentTime = dayjs();
    setService(() => selectedService);
    const finish_expectation = currentTime
      .add(selectedService.service_time_hour, "h")
      .format("DD/MM/YYYY HH:mm:ss");

    setData((prev) => ({
      ...prev,
      type: selectedService.code,
      created_at: currentTime.format("DD/MM/YYYY HH:mm:ss"),
      finish_expectation,
      price: totalPrice,
    }));
  }

  useEffect(() => {
    async function getData() {
      const [branches, services] = await Promise.all([
        api.laundryBranch.getAll(),
        api.laundryService.getAll(),
      ]);
      setBranch(() => {
        return branches.map((el) => ({ value: el.code, label: el.name }));
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
            value={data.origin}
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                origin: e.target.value as string,
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
            value={data.type}
            option={services.map((el) => ({ value: el.code, label: el.name }))}
            onChange={(e) => handleServiceChange(e.target.value as string)}
          />
          <Stack direction="row" justifyContent="space-between" gap="1rem">
            <DatePicker
              label="tanggal masuk"
              value={dayjs(data.created_at)}
              disabled
            />
            <DatePicker
              label="tanggal selesai"
              value={dayjs(data.finish_expectation)}
              disabled
            />
          </Stack>
          <Stack direction="row" justifyContent="space-between" gap="1rem">
            {service?.pricing_type == "weight" ? (
              <TextInput
                label="berat"
                type="number"
                onChange={(e) =>
                  handleWeightChange(e.target.value as unknown as number)
                }
                value={data.weight}
                required
              />
            ) : (
              <TextInput
                label="jumlah"
                type="number"
                onChange={(e) =>
                  handleQtyChange(e.target.value as unknown as number)
                }
                value={data.weight}
                required
              />
            )}
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
          <TextareaAutosize
            placeholder="catatan"
            value={data.notes}
            onChange={(e) =>
              setData((prev) => ({ ...prev, notes: e.target.value }))
            }
          ></TextareaAutosize>
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
