import { LaundryService } from "@/type/laundry";
import { LaundryServiceApiContract } from "../contract";

async function getAll(): Promise<LaundryService[]> {
  return [
    {
      id: "SRV001",
      name: "Express Wash",
      code: "EXP001",
      price_per_kg: 1_000,
      service_time_hour: 2,
      created_at: "2024-12-01T09:00:00Z",
      created_by: "admin_user1",
    },
    {
      id: "SRV002",
      name: "Regular Wash",
      code: "REG002",
      price_per_kg: 5_000,
      service_time_hour: 6,
      created_at: "2024-11-15T14:30:00Z",
      created_by: "admin_user2",
    },
    {
      id: "SRV003",
      name: "Iron Only",
      code: "IRO003",
      price_per_kg: 3_500,
      service_time_hour: 4,
      created_at: "2024-11-20T11:45:00Z",
      created_by: "admin_user3",
    },
    {
      id: "SRV004",
      name: "Dry Cleaning",
      code: "DRY004",
      price_per_kg: 12_000,
      service_time_hour: 20,
      created_at: "2024-12-05T08:20:00Z",
      created_by: "admin_user4",
    },
    {
      id: "SRV005",
      name: "Delicate Fabrics",
      code: "DEL005",
      price_per_kg: 15_000,
      service_time_hour: 10,
      created_at: "2024-11-30T10:00:00Z",
      created_by: "admin_user5",
    },
  ];
}

export const laundryServiceApi: LaundryServiceApiContract = { getAll };
