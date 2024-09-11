import { PlanType } from "@/domain/entities/plan.types";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "USER" | "ADMIN";
  plan: PlanType;
  createdAt: Date;
};

export type LoginRequest = Pick<User, "email"> & {
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type RegisterRequest = Omit<
  User,
  "id" | "role" | "plan" | "createdAt"
> & {
  password: string;
};

export type RegisterResponse = {
  success: boolean;
};

export type FetchUser = {
  token: string;
};
