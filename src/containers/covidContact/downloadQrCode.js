import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import { DownloadForOfflineOutlined, Home } from "@mui/icons-material";
import { useNavigate, Link, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

import { Assets } from "../../assets/images";

import { GENERATE_QR_CODE_URL } from "../../utils";

import { getOrganizationById } from "../../store/actions";

const DownloadQrCode = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pdfRef = useRef();
  const { organizationId } = useParams();

  const [qrValue, setQrValue] = useState("");

  const {
    isGettingOrganizationById,
    isErrorGettingOrganizationById,
    organizationById,
  } = useSelector((state) => state.covidContact);

  useEffect(() => {
    dispatch(getOrganizationById(organizationId));
  }, [dispatch, organizationId]);

  useEffect(() => {
    if (organizationId) {
      setQrValue(GENERATE_QR_CODE_URL + organizationId);
    }
  }, [organizationId]);

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
      pdf.save("qr-code.pdf");
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: `url(${Assets.auth.group_681}) center no-repeat`,
        backgroundSize: "cover",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isGettingOrganizationById ? (
        <Loading />
      ) : isErrorGettingOrganizationById ? (
        <ErrorPage onHandleReload={() => navigate(0)} />
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "78px",
              position: "fixed",
              top: "22px",
              left: "23px",
              right: "23px",
            }}
          >
            <img
              src={Assets.auth.mask_group1}
              alt="logo"
              style={{ width: "100px", height: "100px" }}
            />
            <IconButton component={Link} to="/home">
              <Tooltip title="Back to Home">
                <Home fontSize="large" sx={{ color: "white" }} />
              </Tooltip>
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "870px",
              height: "600px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "8px",
              backgroundColor: "#FFFFFF",
              padding: "25px",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton onClick={onHandleDownload} sx={{ color: "#681F6E" }}>
                <Typography fontWeight="bold">
                  Download Your Organization QR Code
                </Typography>
                &nbsp;
                <DownloadForOfflineOutlined />
              </IconButton>
            </Box>
            <Box
              ref={pdfRef}
              sx={{
                width: "500px",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "transparent linear-gradient(94deg, #cadbee, #eeeeee)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "25px",
                  mb: 1,
                  textAlign: "center",
                }}
              >
                {organizationById?.organizationName?.toUpperCase()}
              </Typography>
              <QRCode
                size={256}
                style={{ height: "260px", width: "260px" }}
                value={qrValue}
                viewBox={`0 0 256 256`}
              />
              <Typography sx={{ mb: 1, mt: 1 }}>
                LOCATION ID: {organizationById?.organizationId}
              </Typography>
              <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                Check-in | Aarogya
              </Typography>
              <Typography>ඔබත් සමාජයත් COVID උවදුරෙන්</Typography>
              <Typography sx={{ mb: 1 }}>රැකගන්න උදව් වෙන්න</Typography>
              <Typography>www.aarogya.lk</Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DownloadQrCode;
