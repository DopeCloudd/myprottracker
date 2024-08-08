import { User } from "@/domain/entities/user.type";

export type Request = {
  id: number;
  userId: number;
  user: User;
  url: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
};

export enum RequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REFUSED = "REFUSED",
}
