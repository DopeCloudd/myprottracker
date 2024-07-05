import Flex from "@/interface/components/box/flex.component";
import TextPrice from "@/interface/components/text/text-price.component";
import {
  CardContent,
  CardMedia,
  Card as MuiCard,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";

type CardProps = {
  title: string;
  description: string;
  price?: number;
  quantity?: string;
  rating?: number;
  image?: string;
  brand?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  price,
  quantity,
  rating,
  image,
  brand,
  onClick,
}) => {
  return (
    <MuiCard
      sx={{
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#171717",
        boxShadow: "0px 0px 15px 2px #0c0c0c",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "#1f1f1f",
        },
      }}
      onClick={onClick}
    >
      {image && (
        <CardMedia
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "40%",
            aspectRatio: "4/4",
          }}
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
        <Flex>
          {price && <TextPrice price={price} type="card" />}
          {price && quantity && <div style={{ width: "1rem" }}></div>}
          {quantity && (
            <Typography
              component="p"
              sx={{
                fontSize: "1rem",
                opacity: "0.5",
              }}
            >
              {quantity}
            </Typography>
          )}
        </Flex>
        {brand && (
          <Typography
            component="p"
            sx={{
              fontSize: "1rem",
              opacity: "0.5",
            }}
          >
            Vendu par {brand}
          </Typography>
        )}
        {rating && (
          <Rating
            name="rating"
            defaultValue={rating}
            precision={0.1}
            readOnly
          />
        )}
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
