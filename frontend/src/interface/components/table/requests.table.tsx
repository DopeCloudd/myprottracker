import useRequests from "@/application/hooks/useRequests";
import Loading from "@/interface/layout/loading.layout";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Link, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ReactNode } from "react";

interface Column {
  id: "id" | "url" | "email";
  label: string;
  minWidth?: number;
  align?: "right";
  link?: (value: string) => ReactNode;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID" },
  {
    id: "url",
    label: "URL",
    minWidth: 200,
    link: (url) => {
      return (
        <Link href={url} target="_blank" color="inherit">
          {url}
        </Link>
      );
    },
  },
  { id: "email", label: "Email" },
];

export default function RequestsTable({ maxHeight }: { maxHeight?: number }) {
  const { rows, requestsLoading } = useRequests();

  return (
    <Box>
      <Typography component="h1" variant="h2" mb={2}>
        Liste des demandes
      </Typography>
      <Box>
        <Loading loading={[requestsLoading]}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ width: "100%", overflow: "hidden", mb: 6 }}>
                <TableContainer
                  sx={{
                    maxHeight: maxHeight ?? 400,
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
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                aria-label="Supprimer le produit"
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
        </Loading>
      </Box>
    </Box>
  );
}
