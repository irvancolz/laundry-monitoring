import { TableMetaData } from "./laundry";

export type Gender = "pria" | "wanita";

export type Employee = {
  id: number;
} & EmployeeRequest &
  TableMetaData;

export type EmployeeRequest = {
  name: string | null;
  contact: string | null;
  gender: Gender | null;
  created_at: string | null;
  created_by: string | null;
};
