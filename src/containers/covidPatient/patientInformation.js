import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import PersonalInformation from "./personalInformation";
import MedicalInformation from "./medicalInformation";
import InitialConfirmationInformation from "./initialConfirmationInformation";
import GuardianInformation from "./guardianInformation";
import Loading from "../../components/loading";

const PatientInformation = ({ covidPatientById }) => {
  const [expanded, setExpanded] = useState("panel1");

  const { isGettingPatientById, isErrorGettingPatientById } = useSelector(
    (state) => state.covidPatient
  );

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
            Personal Information
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
            <PersonalInformation covidPatientById={covidPatientById} />
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
            Medical Information
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
            <MedicalInformation covidPatientById={covidPatientById} />
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
            Initial Confirmation Information
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
            <InitialConfirmationInformation
              covidPatientById={covidPatientById}
            />
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Guardian's Information
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
            <GuardianInformation covidPatientById={covidPatientById} />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default PatientInformation;
