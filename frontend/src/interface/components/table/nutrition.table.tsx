import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(name: string, data_100: number, data_portion: number) {
  return { name, data_100, data_portion };
}

const rows = [
  createData("Energie/kcal", 159, 6.0),
  createData("Protéines", 6.0, 4.0),
  createData("Glucides", 24, 4.0),
  createData("Lipides", 4.0, 3.0),
];

export default function NutritionTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <Table sx={{ minWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Pour 100g</TableCell>
            <TableCell align="right">Par portion&nbsp;(25g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.data_100}</TableCell>
              <TableCell align="right">{row.data_portion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
