"use client";
import { api } from "@/api";
import Button from "@/comps/button";
import OrderCard from "@/comps/order-card";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import { Order } from "@/type/laundry";
import { FilterAlt, LocalLaundryServiceOutlined } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    async function getOrder() {
      const resp = await api.order.getAll();
      setOrder(() => resp);
    }
    getOrder();
  }, []);

  return (
    <>
      <Topbar />
      <Stack flexGrow={1} gap="1rem" marginBlock="2rem">
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <Text sx={{ fontWeight: 700 }}>Pesanan Aktif</Text>
          <Text sx={{ textDecoration: "underline", fontSize: ".8rem" }}>
            <Link href="/order">lihat semua</Link>
          </Text>
        </Stack>
        <TextInput placeholder="No Resi Atau Nama Pelanggan" />
        <Button
          sx={{ marginBottom: ".8rem" }}
          startIcon={<FilterAlt />}
          aria-label="urutkan"
        >
          Urutkan
        </Button>
        <Stack
          sx={{
            flexGrow: 1,
          }}
        >
          <Stack sx={{ height: "20rem", overflow: "scroll", gap: ".75rem" }}>
            {order.map((item, i) => {
              return (
                <Link key={i} href={`order/${item.id}`}>
                  <OrderCard order={item} />
                </Link>
              );
            })}
          </Stack>
        </Stack>
        <Button
          startIcon={<LocalLaundryServiceOutlined fontSize="inherit" />}
          onClick={() => redirect("/order/create")}
        >
          Tambah Pesanan
        </Button>
      </Stack>
    </>
  );
}
