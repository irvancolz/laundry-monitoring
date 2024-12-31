"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Text from "./text";
import { ModalSeverity, useModal } from "@/context/modal-ctx";
import { Stack } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "20em",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const infoTitle: Record<ModalSeverity, string> = {
  error: "terjadi kesalahan",
  info: "pemberitahuan",
  success: "berhasil",
};

export default function Modal() {
  const { opened, message, close, severity, title, type, onAccept, onReject } =
    useModal();

  function accept() {
    if (!onAccept) return;
    onAccept();
  }

  function reject() {
    onReject?.();
    close();
  }

  const infoModalActions = <Button onClick={close}>Mengerti</Button>;

  const confirmModalActions = (
    <Stack direction="row" sx={{ gap: ".5rem" }}>
      <Button onClick={reject}>Batalkan</Button>
      <Button onClick={accept}>Lanjutkan</Button>
    </Stack>
  );

  return (
    <BootstrapDialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={opened}
    >
      <DialogTitle
        sx={{ m: 0, p: 2, textTransform: "capitalize" }}
        id="customized-dialog-title"
      >
        {type == "notif" ? infoTitle[severity] : title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={close}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Text>{type == "notif" ? message : "apakah anda yakin ?"}</Text>
      </DialogContent>
      <DialogActions>
        {type == "notif" ? infoModalActions : confirmModalActions}
      </DialogActions>
    </BootstrapDialog>
  );
}
