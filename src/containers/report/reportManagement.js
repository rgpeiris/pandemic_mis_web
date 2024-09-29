import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import {
  Diversity1,
  Vaccines,
  ContentPasteSearch,
  LocalHospital,
} from "@mui/icons-material";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";

const ReportManagement = () => {
  const menuItems = [
    {
      label: "COVID Vaccination Reports",
      icon: <Vaccines sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/report-management/covid-vaccination-reports",
    },
    {
      label: "COVID Testing Reports",
      icon: <ContentPasteSearch sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/report-management/covid-testing-reports",
    },
    {
      label: "COVID Patients Reports",
      icon: <LocalHospital sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/report-management/covid-patients-reports",
    },
    {
      label: "COVID Contacts Reports",
      icon: <Diversity1 sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/report-management/covid-contacts-reports",
    },
  ];

  return (
    <CustomCard>
      <SpaceBetween>
        <Heading title="Report Management" isArrowBack={false} />
      </SpaceBetween>
      <div
        style={{
          margin: "60px 135px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "145px",
              marginBottom: "60px",
              alignItems: "center",
            }}
          >
            <Box
              component={Link}
              to={item.path}
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 0px 6px #00000029",
                padding: "24px",
                display: "flex",
                justifyContent: "Center",
                alignItems: "Center",
              }}
            >
              <IconButton>{item.icon}</IconButton>
            </Box>
            <Typography
              sx={{
                color: "#333333",
                fontSize: "14px",
                fontWeight: "bold",
                marginTop: "22px",
                textAlign: "center",
              }}
            >
              {item.label}
            </Typography>
          </div>
        ))}
      </div>
    </CustomCard>
  );
};

export default ReportManagement;
