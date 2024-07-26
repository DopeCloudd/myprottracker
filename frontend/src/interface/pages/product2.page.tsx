import { useGetProductByIdQuery } from "@/infrastructure/api/product.api";
import { bufferToImageSrc } from "@/infrastructure/helpers/buffer-to-image-src.helper";
import { removeAccents } from "@/infrastructure/helpers/remove-accents.helper";
import SectionAccordion from "@/interface/components/accordion/section.accordion";
import { ButtonAlert } from "@/interface/components/button/button-alert.component";
import ButtonBuy from "@/interface/components/button/button-buy.component";
import { ButtonLike } from "@/interface/components/button/button-like.component";
import Card from "@/interface/components/card/card.component";
import NutritionTable from "@/interface/components/table/nutrition.table";
import TextPrice from "@/interface/components/text/text-price.component";
import TextProductSection from "@/interface/components/text/text-product-section.component";
import { truncateString } from "@/interface/utils/index";
import { Box, Grid, Rating, Typography, styled } from "@mui/material";
import React from "react";
import { Navigate, useParams } from "react-router-dom";

const Product2: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/categories" replace={true} />;
  }

  return <ProductQuery productId={Number(id)} />;
};

const Row = styled(Box)({
  width: "100%",
  display: "flex",
}) as typeof Box;

const ProductQuery: React.FC<{ productId: number }> = ({ productId }) => {
  const { data: product, isLoading } = useGetProductByIdQuery(productId);

  if (!product || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        pt: 4,
        px: { xs: 3, sm: 6 },
        pb: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 2,
          justifyContent: "flex-end",
        }}
      >
        <ButtonAlert productId={product.id} />
        <ButtonLike productId={product.id} />
      </Box>
      <Row
        sx={{
          position: "relative",
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: "50%",
            "& img": {
              aspectRatio: "4/4",
              width: "700px",
            },
          }}
        >
          <img src={bufferToImageSrc(product.image.data)} alt={product.title} />
        </Box>
        <Box
          sx={{
            width: "50%",
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: "Integral Oblique, sans-serif",
              fontSize: "2rem",
              mt: { xs: 0, sm: 2 },
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
            Prix le plus bas : {product.lowestPrice} € · Prix le plus haut :{" "}
            {product.highestPrice} €
          </Typography>
          <ButtonBuy
            content="Acheter"
            onClick={() => {
              window.open(product.url, "_blank");
            }}
          />
          <Box>
            <TextProductSection content={"Analyse"} />
            <Typography
              component="p"
              sx={{
                fontSize: "clamp(1rem, 0.7188rem + 0.75vw, 1.375rem)",
                pb: 3,
              }}
            >
              Notre analyse de la composition de ce produit a pu mettre en avant
              que ...
            </Typography>
          </Box>
        </Box>
      </Row>
      <Row
        sx={{
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: "50%",
          }}
        >
          <SectionAccordion
            header="Description"
            content={truncateString(product.description, 400)}
          />
          <SectionAccordion
            header="Valeurs nutrionnelles"
            content={<NutritionTable />}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Integral Oblique, sans-serif",
              fontSize: "1.5rem",
              pb: 2,
            }}
          >
            Vous pourriez aussi aimer
          </Typography>
          <Grid container spacing={2}>
            {Array.from(Array(6).keys()).map((index) => (
              <Grid item xs={6} key={index}>
                <Card
                  key={index}
                  title={"Product " + index}
                  price={Math.floor(Math.random() * 100)}
                  quantity={"100g"}
                  rating={Math.floor(Math.random() * 5)}
                  image={bufferToImageSrc(product.image.data)}
                  description={"Description " + index}
                  brand={"Brand " + index}
                  onClick={() => {
                    alert("clicked");
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Row>
    </Box>
  );
};

export default Product2;
