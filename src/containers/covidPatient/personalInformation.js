import React from "react";
import { Box } from "@mui/material";
import moment from "moment";

import DisplayRow from "./collection/displayRow";
import DisplayMultilineRow from "./collection/displayMultilineRow";

const PersonalInformation = ({ covidPatientById }) => {
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
        label="Registration Date"
        value={moment(covidPatientById?.registrationDate).format("DD-MMM-YYYY")}
      />
      <DisplayRow
        label="Confirmation Date"
        value={moment(covidPatientById?.confirmedDate).format("DD-MMM-YYYY")}
      />
      <DisplayRow label="NIC Number" value={covidPatientById?.nicNumber} />
      <DisplayMultilineRow
        label="Patient Name"
        value={covidPatientById?.patientName}
      />
      <DisplayRow label="Age" value={covidPatientById?.age?.toString()} />
      <DisplayRow label="Date Of Birth" value={covidPatientById?.dateOfBirth} />
      <DisplayRow label="Gender" value={covidPatientById?.gender} />
      <DisplayRow label="District" value={covidPatientById?.district} />
      <DisplayRow label="DS Division" value={covidPatientById?.dsDivision} />
      <DisplayRow label="MOH Area" value={covidPatientById?.mohArea} />
      <DisplayRow
        label="Grama Niladhari Division"
        value={covidPatientById?.gramaNiladhariArea}
      />
      <DisplayRow label="Phone Number" value={covidPatientById?.phoneNumber} />
      <DisplayMultilineRow label="Address" value={covidPatientById?.address} />
      <DisplayRow
        label="Foreign Entrant"
        value={covidPatientById?.foreignEntrant ? "Yes" : "No"}
      />
      <DisplayRow
        label="Passport Number"
        value={
          covidPatientById?.passportNumber
            ? covidPatientById?.passportNumber
            : ""
        }
      />
    </Box>
  );
};

export default PersonalInformation;
