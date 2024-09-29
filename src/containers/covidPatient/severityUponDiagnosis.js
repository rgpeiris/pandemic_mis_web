import React from "react";
import { Box, Grid, FormLabel } from "@mui/material";

import CustomSelect from "../../components/customSelect";

import { TREATMENT_TYPES_LIST, SEVERITY_LIST } from "../../utils";

const SeverityUponDiagnosis = ({
  state,
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
          <FormLabel component="legend">{"Severity Upon Diagnosis"}</FormLabel>
        </Grid>
        <Grid item xs={7} md={7}>
          <CustomSelect
            fullWidth
            isShowPlaceholder
            name="severityUponDiagnosis"
            value={state?.severityUponDiagnosis || ""}
            selectData={SEVERITY_LIST}
            onChange={onHandleInputChange}
            isValid={isValidFields?.isValidSeverityUponDiagnosis}
            handleClear={onHandleClearChange.bind(
              this,
              "severityUponDiagnosis"
            )}
            isClear={isClearFields?.isClearSeverityUponDiagnosis}
          />
        </Grid>
        <Grid item xs={5} md={5}>
          <FormLabel component="legend">
            {"Recommended Treatment Type"}
          </FormLabel>
        </Grid>
        <Grid item xs={7} md={7}>
          <CustomSelect
            fullWidth
            isShowPlaceholder
            name="recommendTreatmentType"
            value={state?.recommendTreatmentType || ""}
            selectData={TREATMENT_TYPES_LIST}
            onChange={onHandleInputChange}
            isValid={isValidFields?.isValidRecommendTreatmentType}
            handleClear={onHandleClearChange.bind(
              this,
              "recommendTreatmentType"
            )}
            isClear={isClearFields?.isClearRecommendTreatmentType}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SeverityUponDiagnosis;
