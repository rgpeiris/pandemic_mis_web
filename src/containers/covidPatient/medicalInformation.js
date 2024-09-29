import React from "react";
import { Box } from "@mui/material";

import DisplayMultilineRow from "./collection/displayMultilineRow";

const MedicalInformation = ({ covidPatientById }) => {
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
      <DisplayMultilineRow
        label="Critical Medical Information"
        value={covidPatientById?.criticalMedicalInformation}
      />
      <DisplayMultilineRow
        label="Other Medical Notes"
        value={covidPatientById?.otherMedicalNotes}
      />
    </Box>
  );
};

export default MedicalInformation;
