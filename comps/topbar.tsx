"use client";
import { IconButton, Stack } from "@mui/material";
import logo from "../public/laundry-logo-color.png";
import Link from "next/link";
import { Menu } from "@mui/icons-material";

export default function Topbar() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <div style={{ aspectRatio: 105 / 39, height: "39px" }}>
        <Link href="/">
          <img alt="chandra laundry" src={logo.src} />
        </Link>
      </div>
      <IconButton>
        <Menu />
      </IconButton>
    </Stack>
  );
}
