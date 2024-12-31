"use client";
import { api } from "@/api";
import BottomBar from "@/comps/bottom-bar";
import Button from "@/comps/button";
import OrderDetail from "@/comps/order-detail";
import OrderNotFound from "@/comps/order-not-found";
import OrderTracking from "@/comps/order-tracking";
import Text from "@/comps/text";
import Topbar from "@/comps/topbar";
import { Order, OrderStatus, OrderTask } from "@/type/laundry";
import { ArrowBack, EditOutlined, Menu } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  AlertTitle,
  IconButton,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const alertVariant: Record<OrderStatus, AlertColor> = {
  canceled: "error",
  finished: "success",
  onprogress: "info",
};

export default function Page() {
  const [order, setOrder] = useState<Order | null>();
  const [position, setPosition] =
    useState<Pick<OrderTask, "id" | "name" | "order" | "description">>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getData() {
      const [order, progress] = await Promise.all([
        api.order.get(id),
        api.order.getCurrentProgress(id),
      ]);
      setOrder(() => order);
      setPosition(() => progress);
    }
    getData();
  }, [id]);

  if (order == null) {
    return (
      <>
        <Topbar />
        <Stack justifyContent="center" flexGrow={1}>
          <OrderNotFound />
        </Stack>
      </>
    );
  }

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Link href="/">
          <ArrowBack fontSize="inherit" />
        </Link>
        <IconButton>
          <Menu />
        </IconButton>
      </Stack>
      <Stack sx={{ gap: "2rem", marginBlock: "3rem" }}>
        <Alert
          severity={alertVariant[order.status || "canceled"]}
          variant="outlined"
        >
          <AlertTitle>{position?.name}</AlertTitle>
          {position?.description}
        </Alert>
        <div>
          <Text sx={{ marginBottom: "1rem", fontWeight: 700 }}>
            Detail Pesanan
          </Text>
          <OrderDetail order={order} />
        </div>
        <div>
          <Text sx={{ marginBottom: "1rem", fontWeight: 700 }}>
            Lacak Pesanan
          </Text>
          <OrderTracking order_id={id} />
        </div>
      </Stack>
      <BottomBar>
        <Button
          startIcon={<EditOutlined />}
          variant="outlined"
          onClick={() => redirect(`/order/${id}/edit`)}
        >
          Perbarui Pesanan
        </Button>
        <Button startIcon={<ArrowBack />}>Kembali Ke Beranda </Button>
      </BottomBar>
    </>
  );
}
