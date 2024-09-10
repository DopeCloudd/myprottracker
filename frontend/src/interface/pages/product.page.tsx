import { useAuth } from "@/application/hooks/useAuth";
import useProductPage from "@/application/hooks/useProductPage";
import { PlanType } from "@/domain/entities/plan.types";
import { bufferToImageSrc } from "@/infrastructure/helpers/buffer-to-image-src.helper";
import { removeAccents } from "@/infrastructure/helpers/remove-accents.helper";
import SectionAccordion from "@/interface/components/accordion/section.accordion";
import BackButton from "@/interface/components/button/back.button";
import { ButtonAlert } from "@/interface/components/button/button-alert.component";
import ButtonBuy from "@/interface/components/button/button-buy.component";
import { ButtonLike } from "@/interface/components/button/button-like.component";
import HistoryButton from "@/interface/components/button/history.button";
import Card from "@/interface/components/card/card.component";
import NutritionTable from "@/interface/components/table/nutrition.table";
import TextPrice from "@/interface/components/text/text-price.component";
import TextProductSection from "@/interface/components/text/text-product-section.component";
import Loading from "@/interface/layout/loading.layout";
import { truncateString } from "@/interface/utils/index";
import { Box, Link, Rating, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Product: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/categories" replace={true} />;
  }

  return <ProductQuery productId={Number(id)} />;
};

const ProductQuery: React.FC<{ productId: number }> = ({ productId }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { product, productLoading, randomProducts, randomProductsLoading } =
    useProductPage({ id: productId });

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
      <Loading loading={[productLoading, randomProductsLoading]}>
        {!product ? (
          <Typography>Aucun produit trouvé pour cet identifiant.</Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <BackButton />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "65% 35%" },
                gridTemplateRows: {
                  xs: "repeat(3, auto)",
                  sm: "repeat(3, auto)",
                  md: "repeat(2, auto)",
                },
                gridColumnGap: 0,
                gridRowGap: 0,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  gridArea: { xs: "1 / 1 / 2 / 2", md: "1 / 1 / 2 / 2" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "& img": {
                      aspectRatio: "4/4",
                      maxWidth: "100%",
                    },
                  }}
                >
                  <img
                    src={bufferToImageSrc(product.image.data)}
                    alt={product.title}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  py: 2,
                  px: { xs: 2, sm: 4 },
                  gridArea: { xs: "2 / 1 / 3 / 2", md: "1 / 2 / 2 / 3" },
                  height: "fit-content",
                  backgroundImage:
                    "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
                  borderRadius: "10px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    pb: { xs: 2, sm: 0 },
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
                      fontSize:
                        "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
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
                {user?.subscription === PlanType.PREMIUM && (
                  <>
                    <Typography
                      component="p"
                      sx={{
                        opacity: "0.5",
                        fontSize:
                          "clamp(0.875rem, 0.6071rem + 0.7143vw, 1.25rem)",
                      }}
                    >
                      Prix le plus bas : {product.lowestPrice} €
                      <br />
                      Prix le plus haut : {product.highestPrice} €
                    </Typography>
                    <HistoryButton
                      content="Historique des prix"
                      onClick={() => {
                        navigate("/history/" + product.id);
                      }}
                    />
                  </>
                )}
                <ButtonBuy
                  content="Acheter"
                  onClick={() => {
                    window.open(product.url, "_blank");
                  }}
                />
                <Box>
                  <TextProductSection content={"Analyse"} />
                  {!user ? (
                    <Typography
                      component="p"
                      sx={{
                        fontSize: "clamp(1rem, 0.7188rem + 0.75vw, 1.375rem)",
                        pb: 3,
                      }}
                    >
                      Pour accéder à l'analyse de la composition de ce produit,
                      veuillez d'abord vous{" "}
                      <Link href="/login">connecter.</Link>
                    </Typography>
                  ) : user.subscription === PlanType.PREMIUM ? (
                    <Typography
                      component="p"
                      sx={{
                        fontSize: "clamp(1rem, 0.7188rem + 0.75vw, 1.375rem)",
                        pb: 3,
                      }}
                    >
                      Notre analyse de la composition de ce produit a pu mettre
                      en avant que ...
                    </Typography>
                  ) : (
                    <Typography
                      component="p"
                      sx={{
                        fontSize: "clamp(1rem, 0.7188rem + 0.75vw, 1.375rem)",
                        pb: 3,
                      }}
                    >
                      Pour accéder à l'analyse de la composition de ce produit,
                      veuillez souscrire à notre offre Premium.
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  gridArea: { xs: "3 / 1 / 4 / 2", md: "2 / 1 / 3 / 2" },
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    py: 2,
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
                    {randomProducts?.map((product, index) => (
                      <Grid size={{ xs: 12, md: 6 }} key={index}>
                        <Card
                          key={index}
                          title={product.title}
                          price={product.price}
                          quantity={product.quantity}
                          rating={product.rating}
                          image={bufferToImageSrc(product.image.data)}
                          onClick={() => {
                            navigate("/product/" + product.id);
                          }}
                          sx={{
                            minWidth: "200px",
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Loading>
    </Box>
  );
};

export default Product;
