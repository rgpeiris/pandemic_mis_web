import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import DisplayRow from "./collection/displayRow";

const AllocationDetails = ({ covidPatientById }) => {
  const { govOfficersInCharge, healthcareProfessionals } = useSelector(
    (state) => state.covidPatient
  );

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
        label="Local Government In Charge"
        value={
          govOfficersInCharge.find(
            (x) =>
              x.assignedUsername === covidPatientById?.localGovernmentInCharge
          )?.localGovernmentInChargeName
        }
      />
      <DisplayRow
        label="Healthcare Professional In Charge"
        value={
          healthcareProfessionals.find(
            (x) =>
              x.assignedUsername ===
              covidPatientById?.healthcareProfessionalInCharge
          )?.healthcareProfessionalName
        }
      />
    </Box>
  );
};

export default AllocationDetails;
