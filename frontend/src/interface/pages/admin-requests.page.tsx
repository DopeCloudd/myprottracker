import RequestsTable from "@/interface/components/table/requests.table";
import { Box } from "@mui/material";
import React from "react";

const AdminRequests: React.FC = () => {
  return (
    <Box
      sx={{
        px: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <RequestsTable />
      </Box>
    </Box>
  );
};

export default AdminRequests;
