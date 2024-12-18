"use client";
import { api } from "@/api";
import OrderDetail from "@/comps/order-detail";
import OrderNotFound from "@/comps/order-not-found";
import OrderTracking from "@/comps/order-tracking";
import Text from "@/comps/text";
import Topbar from "@/comps/topbar";
import { Order } from "@/type/laundry";
import { ArrowBack, Menu } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [order, setOrder] = useState<Order | null>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getData() {
      const resp = await api.order.get(id);
      setOrder(() => resp);
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
    </>
  );
}
