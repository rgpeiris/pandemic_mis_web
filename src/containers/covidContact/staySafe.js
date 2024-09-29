import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Home } from "@mui/icons-material";

import { Assets } from "../../assets/images";

import EnterOrganizationRefId from "./enterOrganizationRefId";

const StaySafe = () => {
  const navigate = useNavigate();

  const [isShowModal, setShowModal] = useState(false);

  const onHandleShowModal = () => {
    setShowModal(true);
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
          width: "1200px",
          height: "500px",
          display: "flex",
          flexDirection: "row",
          borderRadius: "8px",
          padding: "25px",
        }}
      >
        <Card sx={{ maxWidth: 345, m: 2, backgroundColor: "#f0f8ff" }}>
          <CardMedia
            sx={{ height: 200 }}
            image={Assets.dashboard.registerYourOrg}
            title="Register Your Organization"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Register Your Organization
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Register your organization to keep a digital register of your
              customers with Aarogya Website now
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => navigate(`/register-organization`)}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, m: 2, backgroundColor: "#f0f8ff" }}>
          <CardMedia
            sx={{ height: 200 }}
            image={Assets.dashboard.trackYourCustomers}
            title="Track Your Customers"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Track Your Customers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aarogya can be used to contact people if it finds they have been
              in the same place as someone infected with COVID-19
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={onHandleShowModal}>
              Learn More
            </Button>
          </CardActions>
        </Card>
        <Card sx={{ maxWidth: 345, m: 2, backgroundColor: "#f0f8ff" }}>
          <CardMedia
            sx={{ height: 200 }}
            image={Assets.dashboard.safelyCheckIn}
            title="Safely Check-In"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Safely Check-In
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avoid unnecessary problems by sharing your personal information.
              Aarogya will keep you and your data safe
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navigate(`/check-in-out/0`)}>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Box>

      {/* Modal for enter Organization Reference ID */}
      <EnterOrganizationRefId
        isOpen={isShowModal}
        handleClose={() => setShowModal(false)}
      />
    </Box>
  );
};

export default StaySafe;
