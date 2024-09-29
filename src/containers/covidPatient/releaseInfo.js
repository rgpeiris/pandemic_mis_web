import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormLabel,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import CustomSelect from "../../components/customSelect";
import Loading from "../../components/loading";

const ReleaseInfo = ({
  state,
  statusLists,
  isValidFields,
  isClearFields,
  onHandleInputChange,
  onHandleClearChange,
}) => {
  const [expanded, setExpanded] = useState("panel1");

  const { isGettingPatientById, isErrorGettingPatientById } = useSelector(
    (state) => state.covidPatient
  );

  const handleChange = (panel) => (_e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Release Info
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {isGettingPatientById ? (
          <Loading />
        ) : isErrorGettingPatientById ? (
          <Typography
            variant="string"
            style={{
              fontSize: "16px",
              fontStyle: "italic",
              color: "#8D8D8D",
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            {"No Data Available"}
          </Typography>
        ) : (
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
                <FormLabel component="legend">
                  {"First Negative Confirmation Date"}
                </FormLabel>
              </Grid>
              <Grid item xs={7} md={7}>
                <TextField
                  fullWidth
                  type="date"
                  name="firstNegativeConfirmationDate"
                  value={state?.firstNegativeConfirmationDate || ""}
                  onChange={onHandleInputChange}
                  error={!isValidFields?.isValidFirstNegativeConfirmationDate}
                  helperText={
                    !isValidFields?.isValidFirstNegativeConfirmationDate &&
                    "* Required Field"
                  }
                />
              </Grid>
              <Grid item xs={5} md={5}>
                <FormLabel component="legend">
                  {"Second Negative Confirmation Date"}
                </FormLabel>
              </Grid>
              <Grid item xs={7} md={7}>
                <TextField
                  fullWidth
                  type="date"
                  name="secondNegativeConfirmationDate"
                  value={state?.secondNegativeConfirmationDate || ""}
                  onChange={onHandleInputChange}
                  error={!isValidFields?.isValidSecondNegativeConfirmationDate}
                  helperText={
                    !isValidFields?.isValidSecondNegativeConfirmationDate &&
                    "* Required Field"
                  }
                />
              </Grid>
              <Grid item xs={5} md={5}>
                <FormLabel component="legend">{"Date Of Recovery"}</FormLabel>
              </Grid>
              <Grid item xs={7} md={7}>
                <TextField
                  fullWidth
                  type="date"
                  name="dateOfRecovery"
                  value={state?.dateOfRecovery || ""}
                  onChange={onHandleInputChange}
                  error={!isValidFields?.isValidDateOfRecovery}
                  helperText={
                    !isValidFields?.isValidDateOfRecovery && "* Required Field"
                  }
                />
              </Grid>
              <Grid item xs={5} md={5}>
                <FormLabel component="legend">{"Date Of Death"}</FormLabel>
              </Grid>
              <Grid item xs={7} md={7}>
                <TextField
                  fullWidth
                  type="date"
                  name="dateOfDeath"
                  value={state?.dateOfDeath || ""}
                  onChange={onHandleInputChange}
                  error={!isValidFields?.isValidDateOfDeath}
                  helperText={
                    !isValidFields?.isValidDateOfDeath && "* Required Field"
                  }
                />
              </Grid>
              <Grid item xs={5} md={5}>
                <FormLabel component="legend">
                  {"Release Info Remarks"}
                </FormLabel>
              </Grid>
              <Grid item xs={7} md={7}>
                <TextField
                  fullWidth
                  name="releaseInfoRemarks"
                  value={state?.releaseInfoRemarks || ""}
                  multiline
                  rows={3}
                  onChange={onHandleInputChange}
                  error={!isValidFields?.isValidReleaseInfoRemarks}
                  helperText={
                    !isValidFields?.isValidReleaseInfoRemarks &&
                    "* Required Field"
                  }
                />
              </Grid>
              <Grid item xs={5} md={5}>
                <FormLabel component="legend">{"Status"}</FormLabel>
              </Grid>
              <Grid item xs={7} md={7}>
                <CustomSelect
                  fullWidth
                  isShowPlaceholder
                  name="status"
                  value={state?.status || ""}
                  selectData={statusLists}
                  onChange={onHandleInputChange}
                  isValid={isValidFields?.isValidStatus}
                  handleClear={onHandleClearChange.bind(this, "status")}
                  isClear={isClearFields?.isClearStatus}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ReleaseInfo;
