"use client";
import { createContext, ReactNode, useContext, useState } from "react";

type SidebarContextValue = {
  toggle: () => void;
  close: () => void;
  opened: boolean;
};

const SidebarContext = createContext<SidebarContextValue>(
  {} as SidebarContextValue
);

export const useSidebar = () => useContext(SidebarContext);

export default function SidebarContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [opened, setOpened] = useState<boolean>(false);

  function toggle() {
    setOpened((a) => !a);
  }

  function close() {
    setOpened(() => false);
  }

  return (
    <SidebarContext.Provider value={{ opened, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
}
