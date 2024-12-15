import { OrderTask } from "@/type/laundry";
import { OrderTaskContract } from "@/api/contract";

export async function getAll(): Promise<OrderTask[]> {
  return [
    {
      id: "TASK001",
      order: 1,
      name: "Order Received",
      description: "The order has been received and logged into the system.",
      created_at: "2024-12-10T09:00:00Z",
      created_by: "admin",
    },
    {
      id: "TASK002",
      order: 2,
      name: "Clothes Sorted",
      description:
        "The clothes have been sorted based on color and fabric type.",
      created_at: "2024-12-10T10:00:00Z",
      created_by: "staff001",
    },
    {
      id: "TASK003",
      order: 3,
      name: "Clothes Washed",
      description: "The clothes have been washed using the selected service.",
      created_at: "2024-12-10T11:30:00Z",
      created_by: "staff002",
    },
    {
      id: "TASK004",
      order: 4,
      name: "Clothes Dried",
      description:
        "The washed clothes have been dried and are ready for ironing.",
      created_at: "2024-12-10T12:45:00Z",
      created_by: "staff003",
    },
    {
      id: "TASK005",
      order: 5,
      name: "Clothes Ironed",
      description: "The clothes have been ironed and neatly folded.",
      created_at: "2024-12-10T14:00:00Z",
      created_by: "staff004",
    },
    {
      id: "TASK006",
      order: 6,
      name: "Order Completed",
      description: "The order is ready for pickup or delivery to the customer.",
      created_at: "2024-12-10T15:30:00Z",
      created_by: "admin",
    },
  ];
}

export const orderTaskApi: OrderTaskContract = { getAll };
