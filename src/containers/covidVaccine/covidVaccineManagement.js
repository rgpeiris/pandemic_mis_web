import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import {
  Vaccines,
  Store,
  MoreTime,
  NoteAlt,
  Description,
} from "@mui/icons-material";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";

const CovidVaccineManagement = () => {
  const menuItems = [
    {
      label: "Manage Vaccines",
      icon: <Vaccines sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/covid-vaccine-management/manage-vaccines",
    },
    {
      label: "Manage Vaccination Centers",
      icon: <Store sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/covid-vaccine-management/manage-vaccination-centres",
    },
    {
      label: "Manage Scheduled Vaccination Centers",
      icon: <MoreTime sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/covid-vaccine-management/manage-scheduled-vaccination-centres",
    },
    {
      label: "Manage Vaccination Appointments",
      icon: <Description sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/covid-vaccine-management/manage-vaccination-appointments",
    },
    {
      label: "Manage Vaccinations",
      icon: <NoteAlt sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/covid-vaccine-management/manage-vaccinations",
    },
  ];

  return (
    <CustomCard>
      <SpaceBetween>
        <Heading title="COVID Vaccination Management" isArrowBack={false} />
      </SpaceBetween>
      <div
        style={{
          margin: "60px 95px",
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

export default CovidVaccineManagement;
