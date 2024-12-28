"use client";

import { useSidebar } from "@/context/sidebar";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import logo from "@/public/laundry-logo-color.png";
import {
  ExitToAppOutlined,
  GroupOutlined,
  HomeOutlined,
  Inventory2Outlined,
  Person2Outlined,
  StorefrontOutlined,
} from "@mui/icons-material";
import { ReactElement } from "react";

type SidebarLink = { href: string; icon: ReactElement; label: string };

function SibebarMenu(url: SidebarLink) {
  return (
    <ListItem component="a" href={url.href} disablePadding>
      <ListItemButton sx={{ color: "textPrimary", gap: ".5rem", padding: 0 }}>
        <ListItemIcon sx={{ color: "inherit", minWidth: "1.5rem" }}>
          {url.icon}
        </ListItemIcon>
        <ListItemText sx={{ textTransform: "capitalize" }}>
          {url.label}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export default function Sidebar() {
  const { opened, close } = useSidebar();

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

  const bottomUrls: SidebarLink[] = [
    {
      href: "/account",
      label: "pengaturan akun",
      icon: <Person2Outlined />,
    },
  ];
  return (
    <Drawer open={opened} onClose={close}>
      <Stack
        sx={{
          borderRadius: "0 0.75rem 0.75rem 0",
          padding: "1.5rem",
          flexGrow: 1,
          alignItems: "flex-start",
        }}
      >
        <div style={{ aspectRatio: 105 / 39, height: "39px" }}>
          <img alt="chandra laundry" src={logo.src} />
        </div>
        <Stack
          sx={{
            justifyContent: "space-between",
            flexGrow: 1,
            marginTop: "2rem",
          }}
        >
          <List>
            {mainUrls.map((url, i) => {
              return <SibebarMenu key={i} {...url} />;
            })}
          </List>

          <List>
            {bottomUrls.map((url, i) => {
              return <SibebarMenu key={i} {...url} />;
            })}
            {/* exit icon */}
            <ListItem disablePadding>
              <ListItemButton
                sx={{ color: "textPrimary", gap: ".5rem", padding: 0 }}
              >
                <ListItemIcon sx={{ color: "inherit", minWidth: "1.5rem" }}>
                  <ExitToAppOutlined />
                </ListItemIcon>
                <ListItemText sx={{ textTransform: "capitalize" }}>
                  keluar
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Drawer>
  );
}
