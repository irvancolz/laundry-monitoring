import { ReactNode } from "react";

export type TableProps<T = any> = {
  rows: T[];
  headers: TableColumn<T>[];
};

export type TableColumn<T = Record<string, any>> = {
  field: keyof T | "-";
  label: string;
  render?: (row: T) => ReactNode;
};
