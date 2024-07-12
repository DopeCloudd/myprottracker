import { useAuth } from "@/application/hooks/useAuth";
import { Plan } from "@/domain/entities/plan.types";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";

const CardSubscription: React.FC<Plan> = ({
  title,
  price,
  description,
  buttonText,
  buttonVariant,
  stripePriceLink,
}) => {
  const { user } = useAuth();

  const handleSubscription = (stripePriceLink: string) => {
    window.open(stripePriceLink + "?prefilled_email=" + user?.email, "_self");
  };

  return (
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
            {title}
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
            {price}€
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
        {description.map((line) => (
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
          variant={buttonVariant}
          onClick={() => handleSubscription(stripePriceLink)}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardSubscription;
