import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Dashboard,
  People,
  Vaccines,
  ContentPasteSearch,
  LocalHospital,
  Contacts,
  Newspaper,
  LibraryAddCheck,
  AdminPanelSettings,
  Person,
  Assessment,
} from "@mui/icons-material";

import HeaderBar from "./headerBar";
import MenuBar from "./menuBar";
import MenuModal from "./menuModal";
import Copyright from "../copyright";

import { userLogout } from "../../store/actions/auth";

const drawerWidth = 257;

const Layout = () => {
  const dispatch = useDispatch();

  const [menuItems, setMenuItems] = useState([]);

  const { loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser?.role === "ADMIN") {
        setMenuItems([
          {
            code: "DASHBOARD",
            label: "Dashboard",
            icon: <Dashboard sx={{ fontSize: "27px" }} />,
            path: "/",
          },
          {
            code: "USER_MGT",
            label: "System Users",
            icon: <People sx={{ fontSize: "27px" }} />,
            path: "/user-management",
          },
          {
            code: "ADMIN_FUNCTIONS",
            label: "Admin Functions",
            icon: <AdminPanelSettings sx={{ fontSize: "27px" }} />,
            path: "/admin-function-management",
          },
          {
            code: "NEWS_MGT",
            label: "COVID News",
            icon: <Newspaper sx={{ fontSize: "27px" }} />,
            path: "/covid-news-management",
          },
          {
            code: "PROFILE",
            label: "Profile",
            icon: <Person sx={{ fontSize: "27px" }} />,
            path: "/profile",
          },
        ]);
      } else if (loggedInUser?.role === "POLICYMAKER") {
        setMenuItems([
          {
            code: "DASHBOARD",
            label: "Dashboard",
            icon: <Dashboard sx={{ fontSize: "27px" }} />,
            path: "/",
          },
          {
            code: "REPORTS_MGT",
            label: "Reports",
            icon: <Assessment sx={{ fontSize: "27px" }} />,
            path: "/report-management",
          },
          {
            code: "PROFILE",
            label: "Profile",
            icon: <Person sx={{ fontSize: "27px" }} />,
            path: "/profile",
          },
        ]);
      } else if (loggedInUser?.role === "CHIEF_HEALTHCARE_PROFESSIONAL") {
        setMenuItems([
          {
            code: "DASHBOARD",
            label: "Dashboard",
            icon: <Dashboard sx={{ fontSize: "27px" }} />,
            path: "/",
          },
          {
            code: "VACCINE_MGT",
            label: "COVID Vaccination",
            icon: <Vaccines sx={{ fontSize: "27px" }} />,
            path: "/covid-vaccine-management",
          },
          {
            code: "TEST_MGT",
            label: "COVID Testings",
            icon: <ContentPasteSearch sx={{ fontSize: "27px" }} />,
            path: "/covid-test-management",
          },
          {
            code: "PATIENT_MGT",
            label: "COVID Patients",
            icon: <LocalHospital sx={{ fontSize: "27px" }} />,
            path: "/covid-patient-management",
          },
          {
            code: "CONTACT_MGT",
            label: "COVID Contacts",
            icon: <Contacts sx={{ fontSize: "27px" }} />,
            path: "/covid-contact-management",
          },
          {
            code: "APPROVAL_MGT",
            label: "Approvals",
            icon: <LibraryAddCheck sx={{ fontSize: "27px" }} />,
            path: "/approval-management",
          },
          {
            code: "REPORTS_MGT",
            label: "Reports",
            icon: <Assessment sx={{ fontSize: "27px" }} />,
            path: "/report-management",
          },
          {
            code: "PROFILE",
            label: "Profile",
            icon: <Person sx={{ fontSize: "27px" }} />,
            path: "/profile",
          },
        ]);
      } else if (loggedInUser?.role === "HEALTHCARE_PROFESSIONAL") {
        setMenuItems([
          {
            code: "DASHBOARD",
            label: "Dashboard",
            icon: <Dashboard sx={{ fontSize: "27px" }} />,
            path: "/",
          },
          {
            code: "VACCINE_MGT",
            label: "COVID Vaccination",
            icon: <Vaccines sx={{ fontSize: "27px" }} />,
            path: "/covid-vaccine-management",
          },
          {
            code: "TEST_MGT",
            label: "COVID Testings",
            icon: <ContentPasteSearch sx={{ fontSize: "27px" }} />,
            path: "/covid-test-management",
          },
          {
            code: "PATIENT_MGT",
            label: "COVID Patients",
            icon: <LocalHospital sx={{ fontSize: "27px" }} />,
            path: "/covid-patient-management",
          },
          {
            code: "CONTACT_MGT",
            label: "COVID Contacts",
            icon: <Contacts sx={{ fontSize: "27px" }} />,
            path: "/covid-contact-management",
          },
          {
            code: "REPORTS_MGT",
            label: "Reports",
            icon: <Assessment sx={{ fontSize: "27px" }} />,
            path: "/report-management",
          },
          {
            code: "PROFILE",
            label: "Profile",
            icon: <Person sx={{ fontSize: "27px" }} />,
            path: "/profile",
          },
        ]);
      }
    }
  }, [loggedInUser]);

  const [isOpen, setVisibility] = useState(false);

  const toggleModal = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setVisibility(open);
  };

  const onHandleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <Box sx={{ display: "flex", pt: 8 }}>
      {/* Header bar */}
      <HeaderBar drawerWidth={drawerWidth} />

      {/* Menu bar */}
      <MenuBar
        drawerWidth={drawerWidth}
        toggleModal={toggleModal}
        menuItems={menuItems}
      />

      {/* Side Modal */}
      <MenuModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        handleLogout={onHandleLogout}
        setVisibility={setVisibility}
      />

      {/* Container */}
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          height: "calc(100vh - 64px)",
          minWidth: "600px",
          overflow: "auto",
          backgroundColor: "#EEEEEE",
          p: 2,
        }}
      >
        <Box sx={{ flex: 1, pb: "18px" }}>
          <Outlet />
        </Box>
        <Copyright />
      </Box>
    </Box>
  );
};

export default Layout;
