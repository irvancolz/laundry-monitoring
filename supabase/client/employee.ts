import { EmployeeContract } from "@/api/contract";
import { Employee, EmployeeRequest } from "@/type/employee";
import { supabase } from ".";
import { date } from "@/utils/date";
import { SUPABASE_EMPLOYEE_TABLE } from "./const";

async function getAll(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from(SUPABASE_EMPLOYEE_TABLE)
    .select()
    .eq("is_deleted", false);
  if (error != null) throw error;

  return data;
}

async function create(employee: EmployeeRequest): Promise<Employee> {
  const existing = await supabase
    .from(SUPABASE_EMPLOYEE_TABLE)
    .select("*", { count: "exact", head: false });

  if (existing.error)
    throw new Error("failed to check current existing employee total");

  employee.created_by = "PLACEHOLDER";
  employee.created_at = date.currentTime();

  const { data, error } = await supabase
    .from(SUPABASE_EMPLOYEE_TABLE)
    .insert(employee)
    .select()
    .single();

  if (error != null) throw error;

  return data;
}

async function update(employee: Employee): Promise<Employee> {
  const updatePayload = {
    name: employee.name,
    contact: employee.contact,
    gender: employee.gender,
    updated_at: date.currentTime(),
    updated_by: "PLACEHOLDER",
  };
  const { data, error } = await supabase
    .from(SUPABASE_EMPLOYEE_TABLE)
    .update(updatePayload)
    .eq("id", employee.id)
    .select()
    .single();
  if (error != null) throw error;

  return data;
}

async function remove(employee: Employee): Promise<Employee> {
  const { data, error } = await supabase
    .from(SUPABASE_EMPLOYEE_TABLE)
    .update({
      deleted_at: date.currentTime(),
      deleted_by: "PLACEHOLDER",
      is_deleted: true,
    })
    .eq("id", employee.id)
    .select()
    .single();
  if (error != null) throw error;

  return data;
}

export const employeeApi: EmployeeContract = {
  create,
  update,
  delete: remove,
  getAll,
};
