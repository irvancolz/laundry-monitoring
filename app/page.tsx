"use client";
import Button from "@/comps/button";
import Table from "@/comps/table/table";
import { TableColumn } from "@/comps/table/type";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import { Order } from "@/type/laundry";
import { FilterAlt, LocalLaundryServiceOutlined } from "@mui/icons-material";
import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import { ReactNode, useState } from "react";

const data: Order[] = [
  {
    id: "ORD001",
    customer_name: "John Doe",
    type: "express",
    status: "on process",
    weight: 5.2,
    origin: "Branch A",
    created_at: "2024-12-10T10:15:30Z",
    finish_expectation: "2024-12-11T10:15:30Z",
    process_id: "PROC001",
    price: 52000,
    notes: "Handle with care, customer requested next-day delivery.",
  },
  {
    id: "ORD002",
    customer_name: "Jane Smith",
    type: "regular",
    status: "finished",
    weight: 3.5,
    origin: "Branch B",
    created_at: "2024-12-08T14:25:45Z",
    finish_expectation: "2024-12-12T14:25:45Z",
    process_id: "PROC002",
    price: 35000,
  },
  {
    id: "ORD003",
    customer_name: "Michael Johnson",
    type: "express",
    status: "finished",
    weight: 7.8,
    origin: "Branch C",
    created_at: "2024-12-09T08:10:00Z",
    finish_expectation: "2024-12-10T08:10:00Z",
    process_id: "PROC003",
    price: 78000,
    notes: "Customer prefers pick-up from the branch.",
  },
  {
    id: "ORD004",
    customer_name: "Emily Davis",
    type: "regular",
    status: "on process",
    weight: 4.2,
    origin: "Branch A",
    created_at: "2024-12-11T09:45:20Z",
    finish_expectation: "2024-12-14T09:45:20Z",
    process_id: "PROC004",
    price: 42000,
    notes: "Customer requested additional ironing service.",
  },
  {
    id: "ORD005",
    customer_name: "Chris Brown",
    type: "express",
    status: "on process",
    weight: 6.3,
    origin: "Branch D",
    created_at: "2024-12-11T13:20:15Z",
    finish_expectation: "2024-12-12T13:20:15Z",
    process_id: "PROC005",
    price: 63000,
  },
];

function CustomTabPanel(props: {
  index: number;
  value: number;
  children?: ReactNode;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const tableColumns: TableColumn<Order>[] = [
  {
    field: "id",
    label: "Nomor",
  },
  {
    field: "customer_name",
    label: "Nama",
  },
  {
    field: "type",
    label: "Tipe",
  },
  {
    field: "status",
    label: "Status",
  },
  {
    field: "-",
    label: "Menu",
  },
];

export default function Home() {
  const [value, setValue] = useState(0);
  const finishedOrder = [...data].filter((e) => e.status == "finished");
  const unFinishedOrder = [...data].filter((e) => e.status != "finished");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Topbar />
      <Stack flexGrow={1} gap="1rem" marginBlock="2rem">
        <Stack direction="row" gap="1rem">
          <TextInput placeholder="Cari Pesanan" />
          <Button aria-label="urutkan">
            <FilterAlt />
          </Button>
        </Stack>
        <Box flexGrow={1}>
          <Paper>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Berjalan" />
                <Tab label="Selesai" />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Table rows={unFinishedOrder} headers={tableColumns} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Table rows={finishedOrder} headers={tableColumns} />
            </CustomTabPanel>
          </Paper>
        </Box>
        <Button startIcon={<LocalLaundryServiceOutlined fontSize="inherit" />}>
          Tambah Pesanan
        </Button>
      </Stack>
    </>
  );
}
