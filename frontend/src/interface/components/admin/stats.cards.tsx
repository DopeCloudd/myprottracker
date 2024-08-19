import useStats from "@/application/hooks/useStats";
import FactoryIcon from "@mui/icons-material/Factory";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import React from "react";

const StatsCards: React.FC = () => {
  const { stats } = useStats();

  const items = [
    {
      icon: <FactoryIcon />,
      description: stats?.count_brands + " marques disponibles",
    },
    {
      icon: <FormatListBulletedIcon />,
      description: stats?.count_categories + " catégories disponibles",
    },
    {
      icon: <ShoppingCartIcon />,
      description: stats?.count_products + " produits disponibles",
    },
    {
      icon: <QuestionAnswerIcon />,
      description: stats?.count_requests + " demandes en attente",
    },
    {
      icon: <GroupIcon />,
      description: stats?.count_users + " utilisateurs inscrits",
    },
  ];
  return (
    <Grid
      container
      spacing={3}
      sx={{
        py: 4,
      }}
    >
      {items.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
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
              <Typography
                variant="body1"
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
  );
};

export default StatsCards;
