import React from "react";
import { Box } from "@mui/material";

import DisplayRow from "./collection/displayRow";

const InitialConfirmationInformation = ({ covidPatientById }) => {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        width: "70%",
        margin: "0 auto",
        mb: 2,
      }}
    >
      <DisplayRow
        label="Medical Reporting Agency"
        value={covidPatientById?.medicalReportingAgency}
      />
      <DisplayRow
        label="Reported Health Center"
        value={covidPatientById?.reportedHealthCenter}
      />
    </Box>
  );
};

export default InitialConfirmationInformation;
