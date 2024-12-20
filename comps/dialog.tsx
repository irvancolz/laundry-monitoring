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
import { useModal } from "@/context/modal-ctx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "20em",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Modal() {
  const { opened, message, close } = useModal();

  return (
    <BootstrapDialog
      onClose={close}
      aria-labelledby="customized-dialog-title"
      open={opened}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Terjadi Kesalahan
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
        <Text>{message}</Text>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={close}>
          Mengerti
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
