"use client";
import { useSidebar } from "@/context/sidebar";
import { SidebarLink } from "@/type/general";
import { ReactNode, useEffect } from "react";
import {
  GroupOutlined,
  HomeOutlined,
  Inventory2Outlined,
} from "@mui/icons-material";

const menus: SidebarLink[] = [
  {
    label: "Cabang",
    href: "/laundry/branch",
    icon: <HomeOutlined />,
  },
  {
    label: "Layanan",
    href: "/laundry/service",
    icon: <Inventory2Outlined />,
  },
  {
    label: "Pekerjaan",
    href: "/laundry/tasks",
    icon: <GroupOutlined />,
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  const { setMainMenus } = useSidebar();

  useEffect(() => {
    setMainMenus(menus);
  }, []);
  return children;
}
