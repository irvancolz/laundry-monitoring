"use client";
import { JSX } from "@emotion/react/jsx-runtime";
import { createContext, ReactNode, useContext, useState } from "react";

type BottomDrawerContextValue = {
  opened: boolean;
  close: () => void;
  open: () => void;
  content: JSX.Element | null;
  setContent: (a: JSX.Element) => void;
};

const BottomDrawerContext = createContext<BottomDrawerContextValue>(
  {} as BottomDrawerContextValue
);

export function useBottomDrawer() {
  return useContext(BottomDrawerContext);
}

export default function BottomDrawerContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [opened, setOpened] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element | null>(null);

  function open() {
    setOpened(() => true);
  }

  function close() {
    setOpened(() => false);
  }

  return (
    <BottomDrawerContext.Provider
      value={{ opened, open, close, content, setContent }}
    >
      {children}
    </BottomDrawerContext.Provider>
  );
}
