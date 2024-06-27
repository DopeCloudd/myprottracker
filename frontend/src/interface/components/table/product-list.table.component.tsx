import { useGetProdcutsQuery } from "@/infrastructure/api/product.api";
import FlexCenter from "@/interface/components/box/flex-center.component";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "url" | "title" | "brand" | "category";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
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
  { id: "url", label: "URL", minWidth: 100 },
];

interface Data {
  title: string;
  url: string;
  brand: string;
  category: string;
}

function createData(
  title: string,
  url: string,
  brand: string,
  category: string
): Data {
  return { url, title, brand, category };
}

export default function TableProductList() {
  const { data: products, isLoading } = useGetProdcutsQuery();

  const rows = products?.map((product) =>
    createData(product.title, product.url, product.brand, product.category.name)
  );

  if (isLoading) {
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
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
