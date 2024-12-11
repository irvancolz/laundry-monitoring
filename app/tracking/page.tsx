"use client";

import Button from "@/comps/button";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import {
  Alert,
  AlertTitle,
  Box,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from "@mui/material";
import notFoundImg from "../../public/empty-result.png";
import { Iron, Search } from "@mui/icons-material";
import Text from "@/comps/text";

export default function Page() {
  const result = {
    test: "hello",
  };

  const steps: { label: string; description: string }[] = [
    {
      label: "22 Desember 2024 13:00 WIIB",
      description: "Pesanan masuk ke sistem : CNTR001",
    },
    {
      label: "22 Desember 2024 13:00 WIIB",
      description: "Pesanan masuk ke sistem : CNTR001",
    },
    {
      label: "22 Desember 2024 13:00 WIIB",
      description: "Pesanan masuk ke sistem : CNTR001",
    },
    {
      label: "22 Desember 2024 13:00 WIIB",
      description: "Pesanan masuk ke sistem : CNTR001",
    },
    {
      label: "22 Desember 2024 13:00 WIIB",
      description: "Pesanan masuk ke sistem : CNTR001",
    },
  ];

  return (
    <>
      <Topbar />
      <Stack marginBlock="2rem" flexGrow={1}>
        <Stack gap="1rem">
          <TextInput placeholder="No Pesanan" />
          <Button startIcon={<Search fontSize="inherit" />} fullWidth>
            Cek Pesanan
          </Button>
        </Stack>
        <Stack flexGrow={1} justifyContent="center" alignContent="center">
          {result == null && (
            <Box>
              <div
                style={{
                  aspectRatio: 163 / 138,
                  height: "138px",
                  marginInline: "auto",
                }}
              >
                <img src={notFoundImg.src} alt="order not found" />
              </div>
              <div>
                <Text
                  variant="h2"
                  fontSize="1rem"
                  textAlign="center"
                  fontWeight={700}
                >
                  Pesanan Tidak Ditemukan
                </Text>
                <Text textAlign="center">
                  periksa nomor pesanan anda atau hubungi admin untuk informasi
                  lebih lanjut
                </Text>
              </div>
            </Box>
          )}
          {JSON.stringify(result) == "{}" && null}
          {JSON.stringify(result) != "{}" && result != null && (
            <Box>
              <Alert severity="info" icon={<Iron fontSize="inherit" />}>
                <AlertTitle>Pesanan Anda Sedang Disetrika</AlertTitle>
                sebentar lagi pesanan anda dapat segera di ambil
              </Alert>
              <Box marginBlock="2rem">
                <Text mb="1rem" variant="h2" fontSize="1rem" fontWeight={700}>
                  Detail Pesanan
                </Text>
                <Stack>
                  <Text fontSize=".9rem">Nomor Pesanan : ABC123456</Text>
                  <Text fontSize=".9rem">Nama Pelanggan : John Doe</Text>
                  <Text fontSize=".9rem">Tipe : Cuci Kilat</Text>
                  <Text fontSize=".9rem">Berat : 1.5kg</Text>
                  <Text fontSize=".9rem">
                    Tanggal Masuk : 22 Desember 2024 13:00
                  </Text>
                  <Text fontSize=".9rem">
                    Tanggal Selesai : 22 Desember 2024 14:00
                  </Text>
                </Stack>
              </Box>
            </Box>
          )}
          <div>
            <Text mb="1rem" variant="h2" fontSize="1rem" fontWeight={700}>
              Lacak Pesanan
            </Text>
            <Stepper orientation="vertical" activeStep={2}>
              {steps.map((item, i) => {
                return (
                  <Step key={i}>
                    <StepLabel>{item.label}</StepLabel>
                    <StepContent>{item.description}</StepContent>
                  </Step>
                );
              })}
            </Stepper>
          </div>
        </Stack>
      </Stack>
    </>
  );
}
