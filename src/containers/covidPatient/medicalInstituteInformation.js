import React from "react";
import { Box, Grid, FormLabel, TextField } from "@mui/material";

import CustomSelect from "../../components/customSelect";

import { TREATMENT_TYPES_LIST } from "../../utils";

const MedicalInstituteInformation = ({
  state,
  hospitals,
  isValidFields,
  isClearFields,
  onHandleInputChange,
  onHandleClearChange,
}) => {
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
      <Grid container direction="row" alignItems="center" spacing={2}>
        <Grid item xs={5} md={5}>
          <FormLabel component="legend">{"Hospital Name"}</FormLabel>
        </Grid>
        <Grid item xs={7} md={7}>
          <CustomSelect
            fullWidth
            isShowPlaceholder
            name="hospital"
            menuItemValue={"hospitalId"}
            menuItemText={"hospitalName"}
            value={state?.hospital || ""}
            selectData={hospitals}
            onChange={onHandleInputChange}
            isValid={isValidFields?.isValidHospital}
            handleClear={onHandleClearChange.bind(this, "hospital")}
            isClear={isClearFields?.isClearHospital}
          />
        </Grid>
        <Grid item xs={5} md={5}>
          <FormLabel component="legend">{"Ward Number"}</FormLabel>
        </Grid>
        <Grid item xs={7} md={7}>
          <TextField
            fullWidth
            name="wardNumber"
            value={state?.wardNumber || ""}
            placeholder={"Enter Ward Number"}
            inputProps={{ maxLength: 100 }}
            onChange={onHandleInputChange}
            error={!isValidFields?.isValidWardNumber}
            helperText={!isValidFields?.isValidWardNumber && "* Required Field"}
          />
        </Grid>
        <Grid item xs={5} md={5}>
          <FormLabel component="legend">{"Bed Number"}</FormLabel>
        </Grid>
        <Grid item xs={7} md={7}>
          <TextField
            fullWidth
            name="bedNumber"
            value={state?.bedNumber || ""}
            placeholder={"Enter Bed Number"}
            inputProps={{ maxLength: 100 }}
            onChange={onHandleInputChange}
            error={!isValidFields?.isValidBedNumber}
            helperText={!isValidFields?.isValidBedNumber && "* Required Field"}
          />
        </Grid>
        <Grid item xs={5} md={5}>
          <FormLabel component="legend">
            {"Hospital Admission Number"}
          </FormLabel>
        </Grid>
        <Grid item xs={7} md={7}>
          <TextField
            fullWidth
            name="hospitalAdmissionNumber"
            value={state?.hospitalAdmissionNumber || ""}
            placeholder={"Enter Hospital Admission Number"}
            inputProps={{ maxLength: 100 }}
            onChange={onHandleInputChange}
            error={!isValidFields?.isValidHospitalAdmissionNumber}
            helperText={
              !isValidFields?.isValidHospitalAdmissionNumber &&
              "* Required Field"
            }
          />
        </Grid>
        <Grid item xs={5} md={5}>
          <FormLabel component="legend">{"Date of Hospitalization"}</FormLabel>
        </Grid>
        <Grid item xs={7} md={7}>
          <TextField
            fullWidth
            type="date"
            name="dateOfHospitalization"
            value={state?.dateOfHospitalization || ""}
            onChange={onHandleInputChange}
            error={!isValidFields?.isValidDateOfHospitalization}
            helperText={
              !isValidFields?.isValidDateOfHospitalization && "* Required Field"
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MedicalInstituteInformation;
