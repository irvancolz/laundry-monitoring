import { Order, OrderRequest } from "@/type/laundry";
import { OrderContract } from "../contract";

async function create(order: OrderRequest): Promise<Order> {
  return {
    id: "ORD001",
    customer_name: "John Doe",
    type: "Delicate Fabrics",
    status: "on process",
    weight: 5.2,
    origin: "Branch A",
    created_at: "2024-12-10T10:15:30Z",
    finish_expectation: "2024-12-11T10:15:30Z",
    process_id: "PROC001",
    price: 52000,
    notes: "Handle with care, customer requested next-day delivery.",
    created_by: "admin",
  };
}

async function getAll(): Promise<Order[]> {
  const data: Order[] = [
    {
      id: "ORD001",
      customer_name: "John Doe",
      type: "Delicate Fabrics",
      status: "on process",
      weight: 5.2,
      origin: "Branch A",
      created_at: "2024-12-10T10:15:30Z",
      finish_expectation: "2024-12-11T10:15:30Z",
      process_id: "PROC001",
      price: 52000,
      notes: "Handle with care, customer requested next-day delivery.",
      created_by: "admin",
    },
    {
      id: "ORD002",
      customer_name: "Jane Smith",
      type: "Dry Cleaning",
      status: "finished",
      weight: 3.5,
      origin: "Branch B",
      created_at: "2024-12-08T14:25:45Z",
      finish_expectation: "2024-12-12T14:25:45Z",
      process_id: "PROC002",
      price: 35000,
      created_by: "admin",
    },
    {
      id: "ORD003",
      customer_name: "Michael Johnson",
      type: "Iron Only",
      status: "finished",
      weight: 7.8,
      origin: "Branch C",
      created_at: "2024-12-09T08:10:00Z",
      finish_expectation: "2024-12-10T08:10:00Z",
      process_id: "PROC003",
      price: 78000,
      notes: "Customer prefers pick-up from the branch.",
      created_by: "admin",
    },
    {
      id: "ORD004",
      customer_name: "Emily Davis",
      type: "Iron Only",
      status: "on process",
      weight: 4.2,
      origin: "Branch A",
      created_at: "2024-12-11T09:45:20Z",
      finish_expectation: "2024-12-14T09:45:20Z",
      process_id: "PROC004",
      price: 42000,
      notes: "Customer requested additional ironing service.",
      created_by: "admin",
    },

    {
      id: "ORD005",
      customer_name: "Chris Brown",
      type: "Express Wash",
      status: "on process",
      weight: 6.3,
      origin: "Branch D",
      created_at: "2024-12-11T13:20:15Z",
      finish_expectation: "2024-12-12T13:20:15Z",
      process_id: "PROC005",
      price: 63000,
      created_by: "admin",
    },
  ];

  return data;
}

export const orderApi: OrderContract = { create, getAll };
