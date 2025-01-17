import { Employee, EmployeeRequest } from "@/type/employee";
import {
  LaundryBranch,
  LaundryBranchRequest,
  LaundryService,
  LaundryServiceRequest,
  Order,
  OrderRequest,
  OrderTask,
  OrderTaskProgress,
  OrderTaskRequest,
  ServiceTask,
} from "@/type/laundry";

// dont mind this, just prepare if user want another db than supabase
export interface ApiContract {
  laundryBranch: LaundryBranchApiContract;
  laundryService: LaundryServiceApiContract;
  order: OrderContract;
  orderTask: OrderTaskContract;
  serviceTask: LaundryServiceTaskContract;
  orderProgress: OrderProgressApiContract;
  employee: EmployeeContract;
}

export interface LaundryServiceApiContract {
  getAll: () => Promise<LaundryService[]>;
  get: (id: number) => Promise<LaundryService>;
  create: (
    service: LaundryServiceRequest,
    tasks: OrderTask[]
  ) => Promise<LaundryService>;
  update: (
    service: LaundryService,
    tasks: OrderTask[]
  ) => Promise<LaundryService>;
  delete: (id: number) => Promise<LaundryService>;
  getTasks: (id: number) => Promise<OrderTask[]>;
}

export interface OrderContract {
  getAll: () => Promise<Order[]>;
  create: (order: OrderRequest) => Promise<Order>;
  update: (order: Order) => Promise<Order>;
  get: (id: string) => Promise<Order | null>;
  cancel: (id: string) => Promise<Order | null>;
  proceed: (id: string) => Promise<Order | null>;
  getCurrentProgress: (
    order_id: string
  ) => Promise<Pick<OrderTask, "id" | "name" | "order" | "description">>;
}

export interface OrderTaskContract {
  getAll: () => Promise<OrderTask[]>;
  create: (task: OrderTaskRequest) => Promise<OrderTask>;
  update: (task: OrderTask) => Promise<OrderTask>;
  delete: (task: OrderTask) => Promise<OrderTask>;
}

export interface LaundryBranchApiContract {
  getAll: () => Promise<LaundryBranch[]>;
  get: (id: number) => Promise<LaundryBranch>;
  create: (branch: LaundryBranchRequest) => Promise<LaundryBranch>;
  update: (branch: LaundryBranch) => Promise<LaundryBranch>;
  delete: (branch: LaundryBranch) => Promise<LaundryBranch>;
}

export interface OrderProgressApiContract {
  get: (order_id: string) => Promise<OrderTaskProgress[]>;
  generate: (service_id: number, order_id: string) => void;
}

export interface LaundryServiceTaskContract {
  get: (service_id: number) => Promise<ServiceTask[]>;
  create: (
    tasks: Pick<ServiceTask, "laundry_service_id" | "order_task_id">[]
  ) => Promise<ServiceTask[]>;
  delete: (
    tasks: Pick<ServiceTask, "laundry_service_id" | "order_task_id">[]
  ) => Promise<ServiceTask[]>;
}

export interface EmployeeContract {
  getAll: () => Promise<Employee[]>;
  create: (task: EmployeeRequest) => Promise<Employee>;
  update: (task: Employee) => Promise<Employee>;
  delete: (task: Employee) => Promise<Employee>;
}
