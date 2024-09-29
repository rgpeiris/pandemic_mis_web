import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";

import { Assets } from "../../assets/images";

import Heading from "../../components/heading";
import { SimpleTable } from "../../components/dataTable";
import { SpaceBetween } from "../../components/wrapper";

const VaccinationsReport = () => {
  const { state } = useLocation();
  const pdfRef = useRef();

  const columns = [
    {
      field: "name",
      columnName: "Full Name",
      width: "15%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "15%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "15%",
    },
    {
      field: "centreName",
      columnName: "Vaccination Center Name",
      width: "20%",
    },
    {
      field: "vaccineName",
      columnName: "Vaccine Name",
      width: "10%",
    },
    {
      field: "vaccineDose",
      columnName: "Vaccine Dose",
      width: "10%",
    },
    {
      field: "dateOfVaccination",
      columnName: "Date Of Vaccination",
      width: "10%",
    },
  ];

  const downloadPdf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("report.pdf");
    });
  };

  return (
    <>
      <SpaceBetween>
        <div style={{ marginLeft: "10px" }}>
          <Heading title="" isArrowBack={true} />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "180px",
            borderRadius: "20px",
            background: "transparent linear-gradient(94deg, #B02D41, #D9596D)",
            marginRight: 2,
          }}
          onClick={downloadPdf}
        >
          Download Report
        </Button>
      </SpaceBetween>
      <Box
        ref={pdfRef}
        sx={{
          padding: 5,
          margin: 2,
          border: "1px solid #d9dadf",
          borderRadius: "5px",
          background: "transparent linear-gradient(94deg, #cadbee, #eeeeee)",
        }}
      >
        <SpaceBetween>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "27px",
                textDecoration: "underline",
                marginBottom: 3,
              }}
            >
              Report | CORONA VIRUS DISEASE (COVID-19) Vaccination
            </Typography>
            {state?.otherData?.nicNumber && (
              <Typography fontSize="15px" sx={{ marginBottom: 1 }}>
                <b>NIC Number:</b> {state?.otherData?.nicNumber}
              </Typography>
            )}
            {state?.otherData?.district && (
              <Typography fontSize="15px" sx={{ marginBottom: 1 }}>
                <b>District:</b> {state?.otherData?.district}
              </Typography>
            )}
            {state?.otherData?.center && (
              <Typography fontSize="15px" sx={{ marginBottom: 1 }}>
                <b>Testing Center:</b> {state?.otherData?.center?.centreName}
              </Typography>
            )}
            {state?.otherData?.dateOfVaccination && (
              <Typography fontSize="15px" sx={{ marginBottom: 1 }}>
                <b>Date Of Vaccination:</b>{" "}
                {moment(state?.otherData?.dateOfVaccination).format(
                  "DD-MMM-YYYY"
                )}
              </Typography>
            )}
            <Typography fontSize="15px" sx={{ marginBottom: 1 }}>
              <b>Generated on:</b> {moment().format("DD-MMM-YYYY")}
            </Typography>
          </Box>
          <img
            src={Assets.auth.reportLogo}
            alt="logo"
            style={{ width: "120px", height: "120px" }}
          />
        </SpaceBetween>
        <SimpleTable columns={columns} rows={state?.dataList || []} />
      </Box>
    </>
  );
};

export default VaccinationsReport;
