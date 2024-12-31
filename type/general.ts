import { ReactElement } from "react";

export type Option = {
  label: string;
  value: string | number;
};

export type SidebarLink = { href: string; icon: ReactElement; label: string };
