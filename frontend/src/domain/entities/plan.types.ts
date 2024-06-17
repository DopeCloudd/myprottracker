import { ButtonProps } from "@mui/material/Button";

export enum PlanType {
  FREE = "FREE",
  POWER = "Power Lift",
  MUSCLE = "Muscle Builder",
  PRO = "Pro Gains",
}

export type Plan = {
  title: PlanType;
  subheader?: string;
  price: number;
  time: string;
  description: string[];
  buttonText: string;
  buttonVariant: ButtonProps["variant"];
  stripeIdProduct: string;
};
