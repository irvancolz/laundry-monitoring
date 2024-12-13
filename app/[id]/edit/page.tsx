"use client";

import Button from "@/comps/button";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import { Close, Save } from "@mui/icons-material";
import { Paper, Stack, TextareaAutosize } from "@mui/material";
import DatePicker from "@/comps/datepicker";
import Topbar from "@/comps/topbar";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LaundryService, LaundryType, Order } from "@/type/laundry";
import { Option } from "@/type/general";
import { api } from "@/api";
import Select from "@/comps/select";
import dayjs from "dayjs";
import OrderNotFound from "@/comps/order-not-found";

export default function Page() {
  const [data, setData] = useState<Order | null>();
  const [branch, setBranch] = useState<Option[]>([]);
  const [services, setServices] = useState<LaundryService[]>([]);
  const [service, setService] = useState<LaundryService>();
  const { id } = useParams<{ id: string }>();

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

  useEffect(() => {
    async function getOrder() {
      const order = await api.order.get(id);
      setData(() => order);

      if (order == null || services.length <= 0) return;
      const selectedService = services.find((el) => el.code == order.type);

      if (!selectedService) return;
      setService(() => selectedService);
    }

    getOrder();
  }, [id, services]);

  if (data == null) {
    return (
      <>
        <Topbar />
        <Stack justifyContent="center" flexGrow={1}>
          <OrderNotFound />
        </Stack>
      </>
    );
  }

  const totalPrice = (data.weight || 0) * (service?.price_per_kg || 0);

  function resetForm() {
    setData(
      () =>
        ({
          type: "",
          origin: "",
          customer_name: "",
        } as Order)
    );
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (data == null) return;
    try {
      await api.order.update(data);
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
    if (data == null) return;
    setData(
      (prev) =>
        ({
          ...prev,
          weight: weight,
          price: weight * (service?.price_per_kg || 0),
        } as Order)
    );
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

    if (data == null) return;
    setData(
      (prev) =>
        ({
          ...prev,
          type: selectedService.code,
          created_at: currentTime.format("DD/MM/YYYY HH:mm:ss"),
          finish_expectation,
          price: totalPrice,
        } as Order)
    );
  }

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
              setData(
                (prev) =>
                  ({
                    ...prev,
                    origin: e.target.value as string,
                  } as Order)
              );
            }}
          />
          <TextInput
            label="nama pelanggan"
            required
            value={data.customer_name}
            onChange={(e) =>
              setData(
                (prev) => ({ ...prev, customer_name: e.target.value } as Order)
              )
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
            <TextInput
              label="berat"
              type="number"
              onChange={(e) =>
                handleWeightChange(e.target.value as unknown as number)
              }
              value={data.weight}
              required
            />
            <TextInput
              label="harga"
              type="number"
              value={service?.price_per_kg}
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
              setData((prev) => ({ ...prev, notes: e.target.value } as Order))
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
              Batal Perbarui
            </Button>
            <Button type="submit" startIcon={<Save />}>
              Perbarui Pesanan
            </Button>
          </Stack>
        </Paper>
      </form>
    </>
  );
}
