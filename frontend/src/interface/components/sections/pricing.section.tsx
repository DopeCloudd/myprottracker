import { Plan, PlanType } from "@/domain/entities/plan.types";
import CardSubscription from "@/interface/components/card/subscription.card";
import { Box, Container, Grid, Typography } from "@mui/material";

// TODO : Add the different plans to the database and create hooks to fetch them
const tiers: Plan[] = [
  {
    title: PlanType.PREMIUM,
    price: 2.99,
    description: [
      "Nos analyses détaillées",
      "Comparaison des produits",
      "Alerte sur vos produits favoris",
      "Historique des prix",
      "Demande d'ajout de produit",
    ],
    buttonText: "S'abonner",
    buttonVariant: "outlined",
    stripePriceId: "price_1PbhjjLgRo1w7m00AcJ5MOfI",
    stripePriceLink: "https://buy.stripe.com/test_8wMg240jd8Mxamk9AA",
  },
];

export default function PricingSection() {
  return (
    <Container
      id="pricing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Abonnement
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Libérez tout le potentiel de notre application en vous abonnant à
          notre application. Nos utilisateurs économisent en moyenne <u>30%</u>{" "}
          sur leurs dépenses grâce à notre application. Mettez toutes les
          chances de votre côté pour atteindre vos objectifs sans vous ruiner.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="stretch" justifyContent="center">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={6} md={4}>
            <CardSubscription
              title={tier.title}
              price={tier.price}
              description={tier.description}
              buttonText={tier.buttonText}
              buttonVariant={tier.buttonVariant}
              stripePriceLink={tier.stripePriceLink}
              stripePriceId={tier.stripePriceId}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
