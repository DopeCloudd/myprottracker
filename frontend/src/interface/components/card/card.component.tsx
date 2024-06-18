import {
  CardActionArea,
  CardContent,
  CardMedia,
  Card as MuiCard,
  Typography,
} from "@mui/material";
import React from "react";

type CardProps = {
  title: string;
  description: string;
  image?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ title, description, image, onClick }) => {
  return (
    <MuiCard
      sx={{
        backgroundColor: "#171717",
        boxShadow: "0px 0px 15px 2px #0c0c0c",
        borderRadius: "10px",
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        onClick={onClick}
      >
        {image && (
          <CardMedia
            component="img"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ textTransform: "uppercase" }}
          >
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};

export default Card;
