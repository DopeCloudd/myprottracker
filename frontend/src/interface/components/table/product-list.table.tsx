import useProducts from "@/application/hooks/useProducts";
import { useStartScrapingMutation } from "@/infrastructure/api/scraping.api";
import FlexBetween from "@/interface/components/box/flex-between.component";
import FlexCenter from "@/interface/components/box/flex-center.component";
import Loading from "@/interface/layout/loading.layout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, IconButton, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Column {
  id: "url" | "title" | "brand" | "category";
  label: string;
  minWidth?: number;
  align?: "right";
  link?: (value: string) => ReactNode;
}

const columns: readonly Column[] = [
  { id: "title", label: "Titre", minWidth: 170 },
  {
    id: "brand",
    label: "Marque",
    minWidth: 170,
  },
  {
    id: "category",
    label: "Catégorie",
    minWidth: 170,
  },
  {
    id: "url",
    label: "URL",
    link: (url) => {
      return (
        <Link href={url} target="_blank" color="inherit">
          {url}
        </Link>
      );
    },
  },
];

export default function TableProductList({
  maxHeight,
}: {
  maxHeight?: number;
}) {
  const navigate = useNavigate();
  const { rows, productsLoading, handleProductDelete } = useProducts();
  const [startScraping, { isLoading: loadingScraping }] =
    useStartScrapingMutation();

  if (productsLoading) {
    return (
      <FlexCenter flex={1}>
        <CircularProgress />
      </FlexCenter>
    );
  }

  return (
    <Box>
      <FlexBetween>
        <Typography component="h1" variant="h2" mb={2}>
          Liste des produits
        </Typography>
        <Loading loading={[loadingScraping]}>
          <Button variant="outlined" onClick={() => startScraping()}>
            Actualiser
          </Button>
        </Loading>
      </FlexBetween>
      <Box>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Paper sx={{ width: "100%", overflow: "hidden", mb: 6 }}>
              <TableContainer
                sx={{
                  maxHeight: maxHeight || 600,
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                      <TableCell align="center" colSpan={2}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.url}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.link && typeof value === "string"
                                  ? column.link(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                          <TableCell align="center">
                            <IconButton
                              color="warning"
                              aria-label="Editer le produit"
                              onClick={() => {
                                navigate("/admin/products/" + row.id);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              aria-label="Supprimer le produit"
                              onClick={() => handleProductDelete(row.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
