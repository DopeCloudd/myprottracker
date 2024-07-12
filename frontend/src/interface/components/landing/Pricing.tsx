import { useAuth } from "@/application/hooks/useAuth";
import { Plan, PlanType } from "@/domain/entities/plan.types";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

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

export default function Pricing() {
  const { user } = useAuth();

  const handleSubscription = (stripePriceLink: string) => {
    window.open(stripePriceLink + "?prefilled_email=" + user?.email, "_self");
  };

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
          notre application. Mettez toutes les chances de votre côté pour
          atteindre vos objectifs.
        </Typography>
      </Box>
      <Grid container spacing={3} alignItems="stretch" justifyContent="center">
        {tiers.map((tier) => (
          <Grid item key={tier.title} xs={12} sm={6} md={4}>
            <Card
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                gap: 4,
                border: "1px solid",
                borderColor: "primary.main",
                background:
                  "linear-gradient(180deg, rgba(0,110,57,1) 0%, rgba(0,55,29,1) 100%)",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "grey.100",
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  <Chip
                    icon={<AutoAwesomeIcon />}
                    label={"Recommandé"}
                    size="small"
                    sx={{
                      backgroundColor: "primary.contrastText",
                      "& .MuiChip-label": {
                        color: "primary.dark",
                      },
                      "& .MuiChip-icon": {
                        color: "primary.dark",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    color: "grey.50",
                  }}
                >
                  <Typography component="h3" variant="h2">
                    {tier.price}€
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; par mois
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: "grey.500",
                  }}
                />
                {tier.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color: "primary.light",
                      }}
                    />
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{
                        color: "grey.200",
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  onClick={() => handleSubscription(tier.stripePriceLink)}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
