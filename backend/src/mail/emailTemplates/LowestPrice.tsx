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

interface Props {
  productId: string;
}

const LowestPrice: React.FC<Props> = ({ productId }) => {
  return (
    <Html>
      <Head>
        <style>
          {`
            @font-face {
              font-family: 'Integral';
              src: url("fonts/Fontspring-DEMO-integralcf-regular.otf") format('truetype');
              font-weight: normal;
              font-style: normal;
            }

            .integral {
              font-family: 'Integral', sans-serif;
            }
          `}
        </style>
      </Head>
      <Preview>Welcome to MyProtTracker</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={paragraph} className="integral">
            Hey,
          </Text>
          <Text style={paragraph} className="integral">
            Un produit de votre liste d'alertes est maintenant disponible à un
            prix plus bas.
          </Text>
          <Text className="integral">
            Vous pouvez consulter le produit en cliquant sur le bouton
            ci-dessous.
          </Text>
          <Section style={btnContainer}>
            <Button
              style={button}
              href={`https://myprottracker.com/product/${productId}`}
            >
              Voir l'offre
            </Button>
          </Section>
          <Text style={paragraph}>
            L'équipe,
            <br />
            MyProtTracker
          </Text>
          <Hr style={hr} />
          <Text style={footer}>https://myprottracker.com</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default LowestPrice;

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
