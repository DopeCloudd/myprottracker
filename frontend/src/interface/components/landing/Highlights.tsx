import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BackHandIcon from "@mui/icons-material/BackHand";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SavingsIcon from "@mui/icons-material/Savings";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";
import { Box, Card, Container, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const items = [
  {
    icon: <SavingsIcon />,
    title: "Faites des économies",
    description:
      "Faites des économies sur tout vos achats de produits grâçe à nos alerte de prix.",
  },
  {
    icon: <TroubleshootIcon />,
    title: "Analyse des produits",
    description:
      "Choisissez facilement le produit qui correspond en vous fiant à nos analyses de chaque produit.",
  },
  {
    icon: <BackHandIcon />,
    title: "Pas de publicités",
    description:
      "Notre système de monétisation nous permet de ne pas mettre de publicités.",
  },
  {
    icon: <NotificationsIcon />,
    title: "Restez alerté",
    description:
      "Ne loupez aucun deal sur vos produits favoris en restant alerté sur chaque baisse de prix.",
  },
  {
    icon: <FavoriteIcon />,
    title: "Sauvegardez vos envies",
    description:
      "Vous pouvez facilement ajouter un produit à vos favoris pour le retrouver rapidement.",
  },
  {
    icon: <AddCircleOutlineIcon />,
    title: "Ajoutez vos favoris",
    description:
      "Vous ne trouvez pas votre produit préféré ? Vous pouvez facilement nous le faire savoir.",
  },
];

export default function Highlights() {
  return (
    <Box
      id="highlights"
      sx={{
        width: "100%",
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        backgroundColor: "#06090a",
      }}
    >
      <Container
        sx={{
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
            textAlign: "center",
          }}
        >
          <Typography component="h2" variant="h4">
            Avantages
          </Typography>
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Découvrez pourquoi notre produit se distingue : économies, analyse
            et expérience. Laissez nous vous faire gagner du temps en comparant
            et analysant pour vous des milliers de produits.
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "primary.main",
                  background: "transparent",
                  backgroundColor: "grey.900",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey.400",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      lineClamp: 2,
                    }}
                  >
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
