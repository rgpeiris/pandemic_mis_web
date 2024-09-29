import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import AllocationDetails from "./allocationDetails";
import SeverityUponDiagnosis from "./severityUponDiagnosis";
import MedicalInstituteInformation from "./medicalInstituteInformation";
import Loading from "../../components/loading";

const AllocationInformation = ({
  covidPatientById,
  hospitals,
  state,
  isValidFields,
  isClearFields,
  onHandleInputChange,
  onHandleClearChange,
}) => {
  const [expanded, setExpanded] = useState("panel1");

  const {
    isGettingPatientById,
    isErrorGettingPatientById,
    isGettingGovOfficersInCharge,
    isErrorGettingGovOfficersInCharge,
    isGettingHealthcareProfessionals,
    isErrorGettingHealthcareProfessionals,
    isGettingHospitals,
    isErrorGettingHospitals,
  } = useSelector((state) => state.covidPatient);

  const handleChange = (panel) => (_e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
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
            Allocation Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isGettingPatientById ||
          isGettingGovOfficersInCharge ||
          isGettingHealthcareProfessionals ? (
            <Loading />
          ) : isErrorGettingPatientById ||
            isErrorGettingGovOfficersInCharge ||
            isErrorGettingHealthcareProfessionals ? (
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
            <AllocationDetails covidPatientById={covidPatientById} />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Severity Upon Diagnosis
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
            <SeverityUponDiagnosis
              state={state}
              isValidFields={isValidFields}
              isClearFields={isClearFields}
              onHandleInputChange={onHandleInputChange}
              onHandleClearChange={onHandleClearChange}
            />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Medical Institute Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {isGettingHospitals || isGettingPatientById ? (
            <Loading />
          ) : isErrorGettingHospitals || isErrorGettingPatientById ? (
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
            <MedicalInstituteInformation
              state={state}
              hospitals={hospitals}
              isValidFields={isValidFields}
              isClearFields={isClearFields}
              onHandleInputChange={onHandleInputChange}
              onHandleClearChange={onHandleClearChange}
            />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default AllocationInformation;
