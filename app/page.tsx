"use client";
import { api } from "@/api";
import Button from "@/comps/button";
import OrderCard from "@/comps/order-card";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import { useSidebar } from "@/context/sidebar";
import { Order } from "@/type/laundry";
import { FilterAlt, LocalLaundryServiceOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import {
  GroupOutlined,
  HomeOutlined,
  Inventory2Outlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import { SidebarLink } from "@/type/general";

const mainUrls: SidebarLink[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "Pesanan",
    href: "/order",
    icon: <Inventory2Outlined />,
  },
  {
    label: "Pegawai",
    href: "/employee",
    icon: <GroupOutlined />,
  },
  {
    label: "Laundry",
    href: "/laundry/service",
    icon: <StorefrontOutlined />,
  },
];

export default function Home() {
  const { setMainMenus } = useSidebar();
  const [order, setOrder] = useState<Order[]>([]);

  useEffect(() => {
    async function getOrder() {
      const resp = await api.order.getAll();
      setOrder(() => resp);
    }
    getOrder();
    setMainMenus(mainUrls);
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
