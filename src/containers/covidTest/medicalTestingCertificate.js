import React, { useRef } from "react";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import moment from "moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";
import { AddButton } from "../../components/button";
import { SimpleTable } from "../../components/dataTable";

const MedicalTestingCertificate = () => {
  const { state } = useLocation();
  const pdfRef = useRef();

  const onHandleDownload = () => {
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
      pdf.save("covid-testing-result.pdf");
    });
  };

  return (
    <CustomCard>
      <SpaceBetween>
        <Heading title="COVID Test Result" isArrowBack={true} />
        <AddButton
          title="Download Certificate"
          onHandleClick={onHandleDownload}
        />
      </SpaceBetween>
      <Box
        ref={pdfRef}
        sx={{
          width: "100%",
          height: "600px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          background: "transparent linear-gradient(94deg, #cadbee, #eeeeee)",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "27px",
            mt: 8,
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          TEST RESULT
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            mb: 7,
            textAlign: "center",
          }}
        >
          CORONA VIRUS DISEASE - COVID-19
        </Typography>
        <SpaceBetween>
          <div>
            <Typography fontSize="16px" marginLeft={20} marginBottom={1}>
              <b>Patient Name:</b> Mr./Ms. {state?.patientName}
            </Typography>
            <Typography fontSize="16px" marginLeft={20} marginBottom={1}>
              <b>NIC Number:</b> {state?.nicNumber}
            </Typography>
            <Typography fontSize="16px" marginLeft={20} marginBottom={1}>
              <b>Address:</b> {state?.address}
            </Typography>
            <Typography fontSize="16px" marginLeft={20} marginBottom={2}>
              <b>Contact Number:</b> {state?.phoneNumber}
            </Typography>
          </div>
          <div>
            <Typography fontSize="16px" textAlign="left" marginRight={20}>
              <b>Collected on:</b>{" "}
              {moment(state?.collectedOn).format("DD-MMM-YYYY")}
            </Typography>
          </div>
        </SpaceBetween>
        <div style={{ marginLeft: 160, marginRight: 160 }}>
          <SimpleTable
            columns={[
              {
                field: "testType",
                columnName: "COVID-19 Test",
                width: "30%",
              },
              {
                field: "result",
                columnName: "Result",
                width: "10%",
              },
            ]}
            rows={[
              {
                testType: state.testingType,
                result: state.testResult,
              },
            ]}
          />
        </div>
        <SpaceBetween>
          <Typography
            sx={{
              fontSize: "16px",
              mt: 8,
              marginLeft: 20,
            }}
          >
            Date: .............................................
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              mt: 8,
              marginRight: 20,
            }}
          >
            Signature: .............................................
          </Typography>
        </SpaceBetween>
      </Box>
    </CustomCard>
  );
};

export default MedicalTestingCertificate;
