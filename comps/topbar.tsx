"use client";
import { IconButton, Stack } from "@mui/material";
import logo from "../public/laundry-logo-color.png";
import Link from "next/link";
import { Menu } from "@mui/icons-material";
import { useSidebar } from "@/context/sidebar";

export default function Topbar() {
  const { toggle } = useSidebar();
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <div style={{ aspectRatio: 105 / 39, height: "39px" }}>
        <Link href="/">
          <img alt="chandra laundry" src={logo.src} />
        </Link>
      </div>
      <IconButton onClick={toggle}>
        <Menu />
      </IconButton>
    </Stack>
  );
}
