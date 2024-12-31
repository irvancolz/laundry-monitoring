"use client";

import { useSidebar } from "@/context/sidebar";
import {
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
  Person2Outlined,
} from "@mui/icons-material";
import { SidebarLink } from "@/type/general";

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
  const { opened, close, mainMenus } = useSidebar();

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
            {mainMenus.map((url, i) => {
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
