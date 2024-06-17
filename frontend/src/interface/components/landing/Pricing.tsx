import { Plan, PlanType } from "@/domain/entities/plan.types";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import DiscountIcon from "@mui/icons-material/Discount";
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
import { useNavigate } from "react-router-dom";

const tiers: Plan[] = [
  {
    title: PlanType.POWER,
    price: 4.99,
    time: "* engagement d'un mois",
    description: [
      "Nos analyses détaillées",
      "Comparaison des produits",
      "Alerte sur vos produits favoris",
      "Historique des prix",
      "Demande d'ajout de produit",
    ],
    buttonText: "S'abonner",
    buttonVariant: "outlined",
    stripeIdProduct: "prod_QCDD4bPwHRCG18",
  },
  {
    title: PlanType.MUSCLE,
    subheader: "Recommendé",
    price: 2.99,
    time: "* engagement pendant 3 mois",
    description: ["Tout Power Lift", "Réduction sur l'abonnement de 40%"],
    buttonText: "S'abonner",
    buttonVariant: "contained",
    stripeIdProduct: "prod_QCrjhRU1NNoBHr",
  },
  {
    title: PlanType.PRO,
    subheader: "- 80%",
    price: 0.99,
    time: "* engagement pendant 1 an",
    description: ["Tout Power Lift", "Réduction sur l'abonnement de 80%"],
    buttonText: "S'abonner",
    buttonVariant: "outlined",
    stripeIdProduct: "prod_QCrj2lSpSG7ywY",
  },
];

export default function Pricing() {
  const navigate = useNavigate();

  const handleSubscription = (stripeIdProduct: string) => {
    navigate("/subscription/" + stripeIdProduct);
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
                border:
                  tier.title === PlanType.MUSCLE ? "1px solid" : undefined,
                borderColor:
                  tier.title === PlanType.MUSCLE ? "primary.main" : undefined,
                background:
                  tier.title === PlanType.MUSCLE
                    ? "linear-gradient(180deg, rgba(0,110,57,1) 0%, rgba(0,55,29,1) 100%)"
                    : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: tier.title === "Muscle Builder" ? "grey.100" : "",
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {tier.title}
                  </Typography>
                  {tier.title === PlanType.MUSCLE && (
                    <Chip
                      icon={<AutoAwesomeIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === "light" ? "" : "none",
                        backgroundColor: "primary.contrastText",
                        "& .MuiChip-label": {
                          color: "primary.dark",
                        },
                        "& .MuiChip-icon": {
                          color: "primary.dark",
                        },
                      }}
                    />
                  )}
                  {tier.title === PlanType.PRO && (
                    <Chip
                      icon={<DiscountIcon />}
                      label={tier.subheader}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === "light" ? "" : "none",
                        backgroundColor: "primary.contrastText",
                        "& .MuiChip-label": {
                          color: "primary.dark",
                        },
                        "& .MuiChip-icon": {
                          color: "primary.dark",
                        },
                      }}
                    />
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "baseline",
                    color:
                      tier.title === PlanType.POWER ? "grey.50" : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    {tier.price}€
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; par mois
                  </Typography>
                </Box>
                {tier.time && (
                  <Typography variant="body1" color="text.secondary">
                    {tier.time}
                  </Typography>
                )}
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
                        color:
                          tier.title === PlanType.POWER
                            ? "primary.light"
                            : "primary.main",
                      }}
                    />
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{
                        color:
                          tier.title === PlanType.POWER
                            ? "grey.200"
                            : undefined,
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
                  onClick={() => handleSubscription(tier.stripeIdProduct)}
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
