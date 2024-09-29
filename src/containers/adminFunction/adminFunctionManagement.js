import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, IconButton } from "@mui/material";
import { LocalHospital, ManageAccounts, AccountBox } from "@mui/icons-material";

import CustomCard from "../../components/customCard";
import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";

const AdminFunctionManagement = () => {
  const menuItems = [
    {
      label: "Manage Hospitals",
      icon: <LocalHospital sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/admin-function-management/manage-hospitals",
    },
    {
      label: "Manage Government Officers In Charge",
      icon: <ManageAccounts sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/admin-function-management/manage-officers-in-charge",
    },
    {
      label: "Manage Healthcare Professionals",
      icon: <AccountBox sx={{ fontSize: "45px", color: "#A92B2B" }} />,
      path: "/admin-function-management/manage-healthcare-professionals",
    },
  ];

  return (
    <CustomCard>
      <SpaceBetween>
        <Heading title="Admin Functions" isArrowBack={false} />
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

export default AdminFunctionManagement;
