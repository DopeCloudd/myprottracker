import { ButtonProps } from "@mui/material/Button";

export enum PlanType {
  FREE = "Starter",
  PREMIUM = "Premium",
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
