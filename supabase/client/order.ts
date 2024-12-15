import {
  Order,
  OrderProgress,
  OrderRequest,
  OrderTaskProgress,
} from "@/type/laundry";
import { OrderContract } from "@/api/contract";

async function create(order: OrderRequest): Promise<Order> {
  return {
    id: "ORD001",
    customer_name: "John Doe",
    service_id: 1,
    status: "on process",
    qty: 5.2,
    code: "abc123",
    branch_id: 1,
    created_at: "2024-12-10T10:15:30Z",
    finish_expectation: "2024-12-11T10:15:30Z",
    price: 52000,
    notes: "Handle with care, customer requested next-day delivery.",
    created_by: "admin",
  };
}

async function get(id: string): Promise<Order | null> {
  return {
    id: "ORD001",
    customer_name: "John Doe",
    type: "IRO003",
    status: "on process",
    weight: 5.2,
    origin: "WSL004",
    created_at: "2024-12-10T10:15:30Z",
    finish_expectation: "2024-12-11T10:15:30Z",
    process_id: "PROC001",
    price: 52000,
    notes: "Handle with care, customer requested next-day delivery.",
    created_by: "admin",
  };
}

async function update(order: Order): Promise<Order> {
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

async function getProgress(params: string): Promise<OrderTaskProgress[]> {
  return [
    {
      id: "PROG001",
      order_id: "ORD123",
      task_id: "TASK001",
      status: "finished",
      created_at: "2024-12-10T09:05:00Z",
      updated_at: "2024-12-10T09:10:00Z",
      name: "Order Received",
      description: "The order has been received and logged into the system.",
      order: 1,
    },
    {
      id: "PROG002",
      order_id: "ORD123",
      task_id: "TASK002",
      status: "on process",
      created_at: "2024-12-10T09:30:00Z",
      updated_at: "2024-12-10T10:15:00Z",
      name: "Clothes Sorted",
      description:
        "The clothes have been sorted based on color and fabric type.",
      order: 2,
    },
    {
      id: "PROG003",
      order_id: "ORD123",
      task_id: "TASK003",
      status: "on process",
      created_at: "2024-12-10T10:20:00Z",
      updated_at: "2024-12-10T11:45:00Z",
      name: "Clothes Washed",
      description: "The clothes have been washed using the selected service.",
      order: 3,
    },
    {
      id: "PROG004",
      order_id: "ORD123",
      task_id: "TASK004",
      status: "on process",
      created_at: "2024-12-10T12:00:00Z",
      updated_at: null,
      name: "Clothes Dried",
      description:
        "The washed clothes have been dried and are ready for ironing.",
      order: 4,
    },
    {
      id: "PROG005",
      order_id: "ORD123",
      task_id: "TASK005",
      status: "on process",
      created_at: "2024-12-10T13:00:00Z",
      updated_at: null,
      name: "Clothes Ironed",
      description: "The clothes have been ironed and neatly folded.",
      order: 5,
    },
    {
      id: "PROG006",
      order_id: "ORD123",
      task_id: "TASK006",
      status: "on process",
      created_at: "2024-12-10T14:30:00Z",
      updated_at: null,
      name: "Order Completed",
      description: "The order is ready for pickup or delivery to the customer.",
      order: 6,
    },
  ];
}

export const orderApi: OrderContract = {
  create,
  getAll,
  update,
  get,
  getProgress,
};
