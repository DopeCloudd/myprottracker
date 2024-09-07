import { render } from "@react-email/render";
import React from "react";
import LowestPrice from "./emailTemplates/LowestPrice";
import WelcomeEmail from "./emailTemplates/WelcomeEmail";

type WelcomeEmailProps = {
  email: string;
};

export const renderWelcomeEmail = (props: WelcomeEmailProps) => {
  return render(React.createElement(WelcomeEmail, props));
};

type LowestPriceProps = {
  productId: string;
};

export const renderLowestPriceEmail = (props: LowestPriceProps) => {
  return render(React.createElement(LowestPrice, props));
};
