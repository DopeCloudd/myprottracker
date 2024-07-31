import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import React from "react";

interface WelcomeEmailProps {
  email: string;
}

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ email }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to MyProtTracker</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph}>Dear {email},</Text>
          <Text style={paragraph}>
            Welcome to MyProtTracker, your personal training assistant.
          </Text>
          <Text>
            We are excited to have you in our gym, we hope you will enjoy your
            next training with your new personal trainer.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="https://myprottracker.com">
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            MyProtTracker team
          </Text>
          <Hr style={hr} />
          <Text style={footer}>https://myprottracker.com</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#00a656",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
