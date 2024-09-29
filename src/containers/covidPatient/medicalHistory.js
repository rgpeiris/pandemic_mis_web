import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { AddButton } from "../../components/button";
import { BasicTable } from "../../components/dataTable";
import { SpaceBetween } from "../../components/wrapper";
import { AdvanceSearch } from "../../components/searchBar";
import Loading from "../../components/loading";

import CreateMedicalHistory from "./createMedicalHistory";

const MedicalHistory = ({ patientId }) => {
  const [expanded, setExpanded] = useState("panel1");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const [isShowCreate, setShowCreate] = useState(false);

  const {
    isGettingMedicalHistoriesById,
    isErrorGettingMedicalHistoriesById,
    medicalHistoriesById,
  } = useSelector((state) => state.covidPatient);

  const columns = [
    {
      field: "examinedDate",
      columnName: "Examined Date",
      width: "20%",
    },
    {
      field: "healthcareProfessionalName",
      columnName: "Examined By",
      width: "20%",
    },
    {
      field: "diagnosisSummary",
      columnName: "Diagnosis Summary",
      width: "20%",
    },
    {
      field: "treatments",
      columnName: "Treatments",
      width: "20%",
    },
    {
      field: "remarks",
      columnName: "Remarks",
      width: "20%",
    },
  ];

  useEffect(() => {
    setMedicalHistoryList(medicalHistoriesById);
  }, [medicalHistoriesById]);

  const handleChange = (panel) => (_e, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const onHandleAdd = () => {
    setShowCreate(true);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
  };

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedMedicalHistoriesList = medicalHistoriesById.filter((x) =>
      x.diagnosisSummary.toLowerCase().includes(searchValue.toLowerCase())
    );
    setMedicalHistoryList(searchedMedicalHistoriesList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setMedicalHistoryList(medicalHistoriesById);
  };

  return (
    <>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <AddButton title="Add Daily Medical Info" onHandleClick={onHandleAdd} />
      </Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {/* <Typography
            sx={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Patient's Medical History
          </Typography> */}
        </AccordionSummary>
        <AccordionDetails>
          {isGettingMedicalHistoriesById ? (
            <Loading />
          ) : isErrorGettingMedicalHistoriesById ? (
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
            <Box sx={{ mb: 2 }}>
              <SpaceBetween>
                <AdvanceSearch
                  placeholder="Search Medical History"
                  keyword={searchValue}
                  onChange={onChangeSearch}
                  onClear={onClearSearch}
                  onClick={onSubmitSearch}
                />
              </SpaceBetween>
              <BasicTable
                currentPage={currentPage}
                columns={columns}
                rows={medicalHistoryList || []}
                recordsPerPage={10}
                handleChangeCurrentPage={(data) => changeCurrentPage(data)}
                handleEdit={null}
              />

              {/* Create Medical History */}
              <CreateMedicalHistory
                isOpen={isShowCreate}
                patientId={patientId}
                handleClose={() => setShowCreate(false)}
              />
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default MedicalHistory;
