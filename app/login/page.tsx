"use client";
import { ArrowBack, Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import logo from "../../public/laundry-logo-color.png";
import TextInput from "@/comps/text-input";
import Button from "@/comps/button";
import { useState } from "react";

export default function Page() {
  const [expandError, setExpandError] = useState<boolean>(true);
  return (
    <div>
      <div>
        <Link href="/">
          <ArrowBack />
        </Link>
      </div>
      <Stack
        sx={{
          marginTop: "2rem",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          height: "90vh",
        }}
      >
        <div style={{ aspectRatio: 105 / 39, height: "39px" }}>
          <img alt="laundry logo" src={logo.src} />
        </div>
        <div>
          <Typography
            variant="h1"
            fontSize="1.5rem"
            color="textPrimary"
            fontWeight={700}
            mt="2rem"
          >
            Selamat Datang
          </Typography>
          <Typography fontSize=".8rem" color="textPrimary" maxWidth="20em">
            silahkan masukkan nama pengguna dan kata sandi anda.
          </Typography>
        </div>
        <Stack gap="1rem" width="100%" mt="3rem">
          <Collapse in={expandError}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setExpandError(false);
                  }}
                >
                  <Close fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity="error"
              variant="outlined"
            >
              error message here
            </Alert>
          </Collapse>
          <TextInput placeholder="Nama Pengguna" />
          <TextInput placeholder="Kata Sandi" />
          <Button>Masuk</Button>
        </Stack>
        <Box flexGrow={1}></Box>
        <Typography width="100%" textAlign="center" fontSize=".8rem">
          made with &hearts; by Irvan Saharudin
        </Typography>
      </Stack>
    </div>
  );
}
