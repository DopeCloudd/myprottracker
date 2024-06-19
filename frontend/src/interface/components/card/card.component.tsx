import Flex from "@/interface/components/box/flex.component";
import TextPrice from "@/interface/components/text/text-price.component";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Card as MuiCard,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import FlexEnd from "../box/flex-end.component";
import ButtonBuy from "../button/button-buy.component";

type CardProps = {
  title: string;
  description: string;
  price?: number;
  quantity?: string;
  rating?: number;
  image?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  price,
  quantity,
  rating,
  image,
  onClick,
}) => {
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
          {price && (
            <FlexEnd>
              <ButtonBuy content="Buy" type="card" onClick={onClick} />
            </FlexEnd>
          )}
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};

export default Card;
