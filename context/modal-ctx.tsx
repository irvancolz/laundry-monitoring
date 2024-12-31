"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export type ModalType = "notif" | "confirm";
export type ModalSeverity = "info" | "error" | "success";

type ConfirmationPayload = {
  title: string;
  onAccept?: () => void;
  onReject?: () => void;
};

type ModalContextValue = {
  open: () => void;
  close: () => void;
  type: ModalType;
  severity: ModalSeverity;
  title: string;
  message: string;
  setMessage: (msg: string) => void;
  handleError: (e: any) => void;
  opened: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  confirm: (a: ConfirmationPayload) => void;
  notif: (severity: ModalSeverity, message: string) => void;
};

const ModalContext = createContext<ModalContextValue>({} as ModalContextValue);

export const useModal = () => useContext(ModalContext);

export default function ModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [opened, setOpened] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<ModalType>("notif");
  // severity only used for info type modal
  const [severity, setSeverity] = useState<ModalSeverity>("success");
  // used in confirm type modal
  const [onAccept, setOnAccept] = useState<() => void>();
  const [onReject, setOnReject] = useState<() => void>();

  function open() {
    setOpened(() => true);
  }

  function close() {
    setOpened(() => false);
  }

  function handleError(e: any) {
    setType("notif");
    setSeverity("error");
    setOpened(() => true);
    setMessage(() => e.message);
  }

  function notif(severity: ModalSeverity, message: string) {
    setType("notif");
    setSeverity(severity);
    setOpened(() => true);
    setMessage(() => message);
    setTitle("");
    setOnAccept(undefined);
    setOnReject(undefined);
  }

  function confirm(a: ConfirmationPayload) {
    setType("confirm");
    setOpened(true);
    setTitle(a.title);
    setOnAccept(a.onAccept);
    setOnReject(a.onReject);
  }

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
        opened,
        message,
        type,
        severity,
        title,
        onAccept,
        onReject,
        confirm,
        setMessage,
        handleError,
        notif,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
