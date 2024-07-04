import FormNewsletter from "@/interface/components/form/form-newsletter.component";
import { TextCopyright } from "@/interface/components/text/text-copyright.component";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    event.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    }
    setTimeout(() => {
      const element = document.getElementById(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <Box component="footer">
      <Divider />
      <Container
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: "center", md: "left" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              minWidth: { xs: "100%", sm: "60%" },
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Integral Oblique, sans-serif",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontSize: "clamp(1.625rem, 1.3571rem + 0.7143vw, 2rem)",
                  "& span": {
                    color: "primary.main",
                    fontFamily: "Integral Oblique, sans-serif",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontSize: "clamp(1.625rem, 1.3571rem + 0.7143vw, 2rem)",
                  },
                }}
              >
                MY<span>PROT</span>TRACKER
              </Typography>
              <Typography variant="body2" fontWeight={600} gutterBottom>
                Newsletter
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Abonnez-vous à notre newsletter pour recevoir des mises à jour
                hebdomadaires et des promotions.
              </Typography>
              <FormNewsletter />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Produit
            </Typography>
            <Link
              color="text.secondary"
              href="#hero"
              onClick={(event) => handleLinkClick(event, "hero")}
            >
              Description
            </Link>
            <Link
              color="text.secondary"
              href="#highlights"
              onClick={(event) => handleLinkClick(event, "highlights")}
            >
              Avantages
            </Link>
            <Link
              color="text.secondary"
              href="#pricing"
              onClick={(event) => handleLinkClick(event, "pricing")}
            >
              Abonnement
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Legal
            </Typography>
            <Link color="text.secondary" href="#">
              Conditions d'utilisation
            </Link>
            <Link color="text.secondary" href="#">
              Confidentialité
            </Link>
            <Link color="text.secondary" href="#">
              Contact
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: { xs: 4, sm: 8 },
            width: "100%",
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <div>
            <Link component={NavLink} color="text.secondary" to="/privacy">
              Politique de Confidentialité
            </Link>
            <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link component={NavLink} color="text.secondary" to="/conditions">
              Conditions d'utilisation
            </Link>
            <TextCopyright />
          </div>
        </Box>
      </Container>
    </Box>
  );
}
