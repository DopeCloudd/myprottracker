import Flex from "@/interface/components/box/flex.component";
import TextPrice from "@/interface/components/text/text-price.component";
import {
  Box,
  CardMedia,
  Card as MuiCard,
  Rating,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import React from "react";

type CardProps = {
  title: string;
  description?: string;
  price?: number;
  quantity?: string;
  rating?: number;
  image?: string;
  brand?: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
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
  sx,
}) => {
  return (
    <MuiCard
      sx={{
        ...sx,
        display: "flex",
        flexDirection: "column",
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
      <Box
        sx={{
          display: "flex",
        }}
      >
        {image && (
          <CardMedia
            component="img"
            src={image}
            alt={title}
            sx={{
              position: "relative",
              maxWidth: "180px",
              maxHeight: "180px",
              aspectRatio: "4/4",
            }}
          />
        )}
        <Box
          sx={{
            pt: 2,
            pl: 2,
            pr: 2,
          }}
        >
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ textTransform: "uppercase" }}
          >
            {title}
          </Typography>
          {rating && (
            <Rating
              name="rating"
              defaultValue={rating}
              precision={0.1}
              readOnly
            />
          )}
          <Flex>
            {price && <TextPrice price={price} type="card" />}
            {price && quantity && (
              <Box sx={{ pl: 1, pr: 1, opacity: 0.5 }}>·</Box>
            )}
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
        </Box>
      </Box>
      {description && (
        <Box
          sx={{
            pr: 2,
            pl: 2,
            pb: 2,
          }}
        >
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              lineClamp: 3,
            }}
          >
            {description.substring(0, 100)}...
          </Typography>
        </Box>
      )}
    </MuiCard>
  );
};

export default Card;
