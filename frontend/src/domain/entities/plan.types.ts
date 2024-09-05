import { ButtonProps } from "@mui/material/Button";

export enum PlanType {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

export type Plan = {
  title: PlanType;
  subheader?: string;
  price: number;
  description: string[];
  buttonText: string;
  buttonVariant: ButtonProps["variant"];
  stripePriceId: string;
  stripePriceLink: string;
};
