"use client";
import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material";
import { themeOptions } from "@/theme";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import id from "dayjs/locale/id";
import Modal from "@/comps/dialog";
import ModalContextProvider from "@/context/modal-ctx";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Chandra Laundry</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <ThemeProvider theme={themeOptions}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={id.name}
        >
          <ModalContextProvider>
            <body>
              <Modal />
              {children}
            </body>
          </ModalContextProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </html>
  );
}
