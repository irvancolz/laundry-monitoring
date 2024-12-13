"use client";
import { Order } from "@/type/laundry";
import { Box, Stack } from "@mui/material";
import Text from "./text";
import { Scale, Schedule } from "@mui/icons-material";
import { Option } from "@/type/general";
import { ReactNode } from "react";
import dayjs from "dayjs";

export default function OrderDetail({ order }: { order: Order }) {
  const listContent: Option[] = [
    {
      label: "Nomor Pesanan",
      value: order.id,
    },
    {
      label: "Nama Pelanggan",
      value: order.customer_name,
    },
    {
      label: "Tipe",
      value: order.type,
    },
    {
      label: "Harga",
      value: order.price as unknown as string,
    },
    {
      label: "Catatan",
      value: order.notes || "-",
    },
  ];

  const gridContent: (Option & { icon: ReactNode })[] = [
    {
      label: "berat",
      value: order.weight + "Kg",
      icon: <Scale sx={{ color: "primary.main" }} />,
    },
    {
      label: "berat",
      value: order.weight + "Kg",
      icon: <Scale sx={{ color: "primary.main" }} />,
    },
    {
      label: "tanggal masuk",
      value: dayjs(order.created_at).format("DD/MMM/YYYY HH:MM"),
      icon: <Schedule sx={{ color: "primary.main" }} />,
    },
    {
      label: "perkiraan selesai",
      value: dayjs(order.created_at).format("DD/MMM/YY"),
      icon: <Schedule sx={{ color: "primary.main" }} />,
    },
  ];

  return (
    <Box>
      <Stack sx={{ gap: ".5em" }}>
        {listContent.map((item, i) => {
          return (
            <Box
              key={i}
              sx={{
                color: "primary.main",
                display: "flex",
                gap: "1em",
                fontSize: ".9rem",
              }}
            >
              <Text sx={{ width: "9em" }}>{item.label}</Text>
              <Text sx={{ fontWeight: 700, flexBasis: "50%" }}>
                {item.value}
              </Text>
            </Box>
          );
        })}
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {gridContent.map((item, i) => {
          return (
            <Stack
              key={i}
              sx={{
                flexGrow: 1,
                flexBasis: "45%",
                paddingBlock: "1rem",
                alignItems: "center",
                justifyItems: "center",
                gap: ".25rem",
              }}
            >
              {item.icon}
              <Text fontWeight={700}>{item.value}</Text>
              <Text fontSize=".8rem">{item.label}</Text>
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
}
