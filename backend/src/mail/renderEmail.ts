import { render } from "@react-email/render";
import React from "react";
import WelcomeEmail from "./emailTemplates/WelcomeEmail";

type WelcomeEmailProps = {
  email: string;
};

export const renderWelcomeEmail = (props: WelcomeEmailProps) => {
  return render(React.createElement(WelcomeEmail, props));
};
