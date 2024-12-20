"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalContextValue = {
  open: () => void;
  close: () => void;
  message: string;
  setMessage: (msg: string) => void;
  handleError: (e: any) => void;
  opened: boolean;
};

const ModalContext = createContext<ModalContextValue>({} as ModalContextValue);

export const useModal = () => useContext(ModalContext);

export default function ModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [opened, setOpened] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  function open() {
    setOpened(() => true);
  }

  function close() {
    setOpened(() => false);
  }

  function handleError(e: any) {
    setOpened(() => true);
    setMessage(() => e.message);
  }

  return (
    <ModalContext.Provider
      value={{ open, close, opened, message, setMessage, handleError }}
    >
      {children}
    </ModalContext.Provider>
  );
}
