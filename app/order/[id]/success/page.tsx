"use client";

import { api } from "@/api";
import BottomBar from "@/comps/bottom-bar";
import Button from "@/comps/button";
import OrderDetail from "@/comps/order-detail";
import OrderNotFound from "@/comps/order-not-found";
import Text from "@/comps/text";
import { Order } from "@/type/laundry";
import { ArrowBack, HomeOutlined, PrintOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>();

  useEffect(() => {
    async function getData() {
      const order = await api.order.get(id);
      setOrder(() => order);
    }
    getData();
  }, [id]);

  return (
    <>
      <Text>
        <Link
          style={{ display: "flex", gap: "1em", alignItems: "center" }}
          href="/"
        >
          <ArrowBack />
          Beranda
        </Link>
      </Text>
      <Stack sx={{ flexGrow: 1, padding: "2rem 0 0 0" }}>
        <Text
          component="h1"
          sx={{
            fontWeight: 700,
            width: "10em",
            textTransform: "capitalize",
            fontSize: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          pesanan berhasil ditambahkan!
        </Text>
        {order == null && <OrderNotFound />}
        {order != null && <OrderDetail order={order!} />}
      </Stack>
      <BottomBar>
        <Button
          variant="outlined"
          onClick={() => redirect("/")}
          startIcon={<HomeOutlined />}
        >
          Kembali ke Beranda
        </Button>
        <Button startIcon={<PrintOutlined />}>Cetak Resi</Button>
      </BottomBar>
    </>
  );
}
