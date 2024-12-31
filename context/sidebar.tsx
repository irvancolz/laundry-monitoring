"use client";
import { SidebarLink } from "@/type/general";
import { createContext, ReactNode, useContext, useState } from "react";

type SidebarContextValue = {
  toggle: () => void;
  close: () => void;
  setMainMenus: (menu: SidebarLink[]) => void;
  mainMenus: SidebarLink[];
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
  const [mainMenus, _setMainMenu] = useState<SidebarLink[]>([]);

  function setMainMenus(menu: SidebarLink[]) {
    _setMainMenu(() => menu);
  }

  function toggle() {
    setOpened((a) => !a);
  }

  function close() {
    setOpened(() => false);
  }

  return (
    <SidebarContext.Provider
      value={{ opened, toggle, close, setMainMenus, mainMenus }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
