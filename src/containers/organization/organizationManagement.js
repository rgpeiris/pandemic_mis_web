import React from "react";
import { Box, Typography } from "@mui/material";

const OrganizationManagement = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography align="center" variant="h5">
        Organization Management
      </Typography>
    </Box>
  );
};

export default OrganizationManagement;
