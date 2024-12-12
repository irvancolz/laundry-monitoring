import { LaundryBranch } from "@/type/laundry";
import { LaundryBranchApiContract } from "../contract";

async function getAll(): Promise<LaundryBranch[]> {
  return [
    {
      id: "BR001",
      name: "Downtown Laundry",
      code: "DTL001",
      created_at: "2024-12-01T09:00:00Z",
      created_by: "admin_user1",
    },
    {
      id: "BR002",
      name: "Uptown Laundry",
      code: "UTL002",
      created_at: "2024-11-15T14:30:00Z",
      created_by: "admin_user2",
    },
    {
      id: "BR003",
      name: "Eastside Laundry",
      code: "ESL003",
      created_at: "2024-11-20T11:45:00Z",
      created_by: "admin_user3",
    },
    {
      id: "BR004",
      name: "Westside Laundry",
      code: "WSL004",
      created_at: "2024-12-05T08:20:00Z",
      created_by: "admin_user4",
    },
    {
      id: "BR005",
      name: "Lakeside Laundry",
      code: "LSL005",
      created_at: "2024-11-30T10:00:00Z",
      created_by: "admin_user5",
    },
  ];
}

export const branchApi: LaundryBranchApiContract = {
  getAll,
};
