import React from "react";
import { Box } from "@mui/material";

import DisplayRow from "./collection/displayRow";
import DisplayMultilineRow from "./collection/displayMultilineRow";

const GuardianInformation = ({ covidPatientById }) => {
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
        label="Guardian's Name"
        value={covidPatientById?.guardianName}
      />
      <DisplayRow
        label="Guardian's NIC Number"
        value={covidPatientById?.guardianNICNumber}
      />
      <DisplayMultilineRow
        label="Guardian's Address"
        value={covidPatientById?.guardianAddress}
      />
      <DisplayRow
        label="Guardian's Phone Number"
        value={covidPatientById?.guardianPhoneNumber}
      />
      <DisplayRow
        label="Relationship to the Patient"
        value={covidPatientById?.guardianRelationship}
      />
      <DisplayRow
        label="Guardian's Assigned Username"
        value={covidPatientById?.guardianAssignedUsername}
      />
    </Box>
  );
};

export default GuardianInformation;
