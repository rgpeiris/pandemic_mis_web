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

const MedicalCertificate = () => {
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
      pdf.save("medical-certificate.pdf");
    });
  };

  return (
    <CustomCard>
      <SpaceBetween>
        <Heading title="Medical Certificate" isArrowBack={true} />
        <AddButton
          title="Download Certificate"
          onHandleClick={onHandleDownload}
        />
      </SpaceBetween>
      <Box
        ref={pdfRef}
        sx={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          alignItems: "center",
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
          MEDICAL CERTIFICATE
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            mb: 5,
            textAlign: "center",
          }}
        >
          COVID-19 FREE/ASYMPTOMATIC CERTIFICATE
        </Typography>
        <Typography
          sx={{
            marginLeft: 20,
            marginRight: 20,
            fontSize: "16px",
          }}
        >
          I, {state?.healthcareProfessionalName} is a registered medical
          practitioner and holding Medical license registration number 1234567
          have examined Mr./Ms. {state?.patientName} ({state?.nicNumber}) on{" "}
          {moment(state?.dateOfRecovery).format("DD-MMM-YYYY")} and have found
          he/she is free from the following disease: CORONA VIRUS Disease -
          COVID-19 currently asymptomatic.
        </Typography>
        <SpaceBetween>
          <Typography
            sx={{
              fontSize: "16px",
              mt: 5,
              marginLeft: 20,
            }}
          >
            Date: .............................................
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              mt: 5,
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

export default MedicalCertificate;
