import useProducts from "@/application/hooks/useProducts";
import FlexCenter from "@/interface/components/box/flex-center.component";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Link } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ReactNode } from "react";

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

export default function TableProductList() {
  const { rows, productsLoading, handleProductDelete } = useProducts();

  if (productsLoading) {
    return (
      <FlexCenter flex={1}>
        <CircularProgress />
      </FlexCenter>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mb: 6 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.url}>
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
                        alert(row.id);
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
  );
}
