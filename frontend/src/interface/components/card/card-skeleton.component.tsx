import {
  CardActionArea,
  CardContent,
  Card as MuiCard,
  Skeleton,
} from "@mui/material";
import React from "react";

type CardSkeletonProps = {
  image: boolean;
};

const CardSkeleton: React.FC<CardSkeletonProps> = ({ image }) => {
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
          alignItems: "center",
          px: 2,
        }}
      >
        {image && <Skeleton variant="rectangular" width={140} height={140} />}
        <CardContent sx={{ width: "100%", pr: 0 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Skeleton variant="text" width={"100%"} height={100} />
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};

export default CardSkeleton;
