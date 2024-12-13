"use client";

import Button from "@/comps/button";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import { Alert, AlertTitle, Box, Stack } from "@mui/material";
import { Iron, Search } from "@mui/icons-material";
import Text from "@/comps/text";
import OrderNotFound from "@/comps/order-not-found";
import OrderTracking from "@/comps/order-tracking";
import { useState } from "react";
import { Order } from "@/type/laundry";
import { api } from "@/api";
import OrderDetail from "@/comps/order-detail";

export default function Page() {
  const [result, setResult] = useState<Order | null>({} as Order);
  const [query, setQuery] = useState<string>("");

  async function handleSearch() {
    const resp = await api.order.get(query);
    setResult(() => resp);
  }

  return (
    <>
      <Topbar />
      <Stack
        sx={{
          marginBlock: "2rem",
          flexGrow: 1,
          gap: "3rem",
        }}
      >
        <Stack gap="1rem">
          <TextInput
            placeholder="No Pesanan"
            value={query}
            onChange={(e) => setQuery(() => e.target.value)}
            required
          />
          <Button
            onClick={handleSearch}
            startIcon={<Search fontSize="inherit" />}
            fullWidth
          >
            Cek Pesanan
          </Button>
        </Stack>
        <Stack
          sx={{
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          {result == null && <OrderNotFound />}
          {JSON.stringify(result) == "{}" && null}
          {JSON.stringify(result) != "{}" && result != null && (
            <>
              <Box>
                <Alert severity="info" icon={<Iron fontSize="inherit" />}>
                  <AlertTitle>Pesanan Anda Sedang Disetrika</AlertTitle>
                  sebentar lagi pesanan anda dapat segera di ambil
                </Alert>
              </Box>
              <OrderDetail order={result} />
              <div>
                <Text mb="1rem" variant="h2" fontSize="1rem" fontWeight={700}>
                  Lacak Pesanan
                </Text>
                <OrderTracking order_id={result?.id || ""} />
              </div>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
}
