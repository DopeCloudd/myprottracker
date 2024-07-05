import { useGetProductByIdQuery } from "@/infrastructure/api/product.api";
import { bufferToImageSrc } from "@/infrastructure/helpers/buffer-to-image-src.helper";
import { removeAccents } from "@/infrastructure/helpers/remove-accents.helper";
import GridProduct from "@/interface/components/box/grid-product.component";
import { ButtonAlert } from "@/interface/components/button/button-alert.component";
import ButtonBuy from "@/interface/components/button/button-buy.component";
import { ButtonLike } from "@/interface/components/button/button-like.component";
import { SkeletonProduct } from "@/interface/components/skeleton/skeleton-product.component";
import TextPrice from "@/interface/components/text/text-price.component";
import TextProductSection from "@/interface/components/text/text-product-section.component";
import { truncateString } from "@/interface/utils/index";
import { Box, Button, Rating, Typography } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";

const Product: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/categories" replace={true} />;
  }

  return <ProductQuery productId={Number(id)} />;
};

const ProductQuery: React.FC<{ productId: number }> = ({ productId }) => {
  const { data: product, isLoading } = useGetProductByIdQuery(productId);

  return (
    <GridProduct
      sx={{
        pt: 4,
        px: 6,
        pb: 4,
      }}
    >
      {isLoading ? (
        <SkeletonProduct />
      ) : !product ? (
        <Box
          sx={{
            gridColumn: "span 2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            mt: 4,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: "2rem",
            }}
          >
            Oops, il semblerait que ce produit n'existe pas.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              mt: 2,
            }}
            onClick={() => {
              window.history.back();
            }}
          >
            Retour
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              px: 4,
              "& img": {
                aspectRatio: "4/4",
                width: "100%",
              },
            }}
          >
            <img
              src={bufferToImageSrc(product.image.data)}
              alt={product.title}
            />
          </Box>
          <Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <ButtonAlert productId={product.id} />
              <ButtonLike productId={product.id} />
            </Box>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: "Integral Oblique, sans-serif",
                fontSize: "2rem",
              }}
            >
              {removeAccents(product.title)}
            </Typography>
            <Rating
              name="read-only"
              value={product.rating}
              precision={0.1}
              readOnly
              sx={{ mt: 2 }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "baseline",
              }}
            >
              <TextPrice price={product.price} type="product" />
              <Typography
                component="p"
                sx={{
                  opacity: "0.5",
                  fontSize: "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
                }}
              >
                {product.quantity}
              </Typography>
            </Box>
            <Typography
              component="p"
              sx={{
                opacity: "0.5",
                fontSize: "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
              }}
            >
              Vendu par {product.brand.name}
            </Typography>
            <Typography
              component="p"
              sx={{
                opacity: "0.5",
                fontSize: "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
              }}
            >
              Prix le plus bas : {product.lowestPrice} €
            </Typography>
            <Typography
              component="p"
              sx={{
                opacity: "0.5",
                fontSize: "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
              }}
            >
              Prix le plus haut : {product.highestPrice} €
            </Typography>
            <ButtonBuy
              content="Acheter"
              onClick={() => {
                window.open(product.url, "_blank");
              }}
            />
            <TextProductSection content={"Analyse"} />
            <Typography
              component="p"
              sx={{ fontSize: "clamp(1rem, 0.7188rem + 0.75vw, 1.375rem)" }}
            >
              Notre analyse de la composition de ce produit a pu mettre en avant
              que ...
            </Typography>
            <TextProductSection content={"Description"} />
            <Typography
              component="p"
              sx={{ fontSize: "clamp(1rem, 0.7188rem + 0.75vw, 1.375rem)" }}
            >
              {truncateString(product.description, 400)}
            </Typography>
          </Box>
        </>
      )}
    </GridProduct>
  );
};

export default Product;
