import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import { QrCode, Logout, AssignmentTurnedIn } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography, Divider } from "@mui/material";

import Heading from "../../components/heading";
import { SpaceBetween } from "../../components/wrapper";
import { AdvanceSearch } from "../../components/searchBar";
import { BasicTable } from "../../components/dataTable";
import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

import { Assets } from "../../assets/images";

import {
  getPandemicContactsByOrgId,
  getOrganizationById,
} from "../../store/actions";

const TraceOrganizationContacts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { organizationId } = useParams();

  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pandemicContactsList, setPandemicContactsList] = useState([]);

  const {
    isGettingPandemicContactsByOrgId,
    isErrorGettingPandemicContactsByOrgId,
    pandemicContactsByOrgId,
    isGettingOrganizationById,
    isErrorGettingOrganizationById,
    organizationById,
  } = useSelector((state) => state.covidContact);

  const columns = [
    {
      field: "name",
      columnName: "Contact Name",
      width: "14%",
    },
    {
      field: "nicNumber",
      columnName: "NIC Number",
      width: "14%",
    },
    {
      field: "phoneNumber",
      columnName: "Contact Number",
      width: "12%",
    },
    {
      field: "address",
      columnName: "Address",
      width: "14%",
    },
    {
      field: "organizationName",
      columnName: "Visited Organization",
      width: "10%",
    },
    {
      field: "checkInTime",
      columnName: "Check-In",
      width: "15%",
    },
    {
      field: "checkOutTime",
      columnName: "Check-Out",
      width: "16%",
    },
  ];

  useEffect(() => {
    dispatch(getOrganizationById(organizationId));
    dispatch(getPandemicContactsByOrgId(organizationId));
  }, [dispatch, organizationId]);

  useEffect(() => {
    setPandemicContactsList(pandemicContactsByOrgId);
  }, [pandemicContactsByOrgId]);

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value.trim());
  };

  const onSubmitSearch = () => {
    setCurrentPage(0);
    let searchedPandemicContactsList = pandemicContactsByOrgId.filter(
      (x) =>
        x.nicNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
        x.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setPandemicContactsList(searchedPandemicContactsList);
  };

  const onClearSearch = () => {
    setCurrentPage(0);
    setSearchValue("");
    setPandemicContactsList(pandemicContactsByOrgId);
  };

  const changeCurrentPage = (data) => {
    setCurrentPage(data);
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
        <IconButton component={Link} to="/stay-safe">
          <Tooltip title="Logout">
            <Logout fontSize="large" sx={{ color: "white" }} />
          </Tooltip>
        </IconButton>
      </Box>
      <Box
        sx={{
          width: "1100px",
          minHeight: "650px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          padding: "25px",
          background: "transparent linear-gradient(94deg, #cde2fb, #eeeeee)",
        }}
      >
        {isGettingPandemicContactsByOrgId || isGettingOrganizationById ? (
          <Loading />
        ) : isErrorGettingPandemicContactsByOrgId ||
          isErrorGettingOrganizationById ? (
          <ErrorPage onHandleReload={() => navigate(0)} />
        ) : (
          <>
            <SpaceBetween>
              <Box>
                <Heading title="Recent Customers" isArrowBack={false} />
                <Typography
                  fontSize="14px"
                  sx={{ marginBottom: 1, marginTop: 1 }}
                >
                  <b>Organization Name:</b> {organizationById?.organizationName}
                </Typography>
                <Typography fontSize="14px" sx={{ marginBottom: 1 }}>
                  <b>Organization Type:</b> {organizationById?.organizationType}
                </Typography>
                <Typography fontSize="14px" sx={{ marginBottom: 1 }}>
                  <b>Address:</b> {organizationById?.address}
                </Typography>
                <Typography fontSize="14px" sx={{ marginBottom: 2 }}>
                  <b>Phone Number:</b> {organizationById?.phoneNumber}
                </Typography>
              </Box>
              <Box>
                <IconButton
                  component={Link}
                  to={`/check-in-out/${organizationId}`}
                  sx={{ backgroundColor: "#dcdcdc", marginRight: 1 }}
                >
                  <Tooltip title="Check-In/Check-Out">
                    <AssignmentTurnedIn
                      fontSize="large"
                      sx={{ color: "#07AA00" }}
                    />
                  </Tooltip>
                </IconButton>
                <IconButton
                  component={Link}
                  to={`/download-qr-code/${organizationId}`}
                  sx={{ backgroundColor: "#dcdcdc" }}
                >
                  <Tooltip title="Download QR Code">
                    <QrCode fontSize="large" sx={{ color: "#D9596D" }} />
                  </Tooltip>
                </IconButton>
              </Box>
            </SpaceBetween>
            <Divider sx={{ position: "relative", bottom: "27px" }} />
            <SpaceBetween>
              <AdvanceSearch
                placeholder="Search Contact"
                keyword={searchValue}
                onChange={onChangeSearch}
                onClear={onClearSearch}
                onClick={onSubmitSearch}
              />
            </SpaceBetween>
            <BasicTable
              currentPage={currentPage}
              columns={columns}
              rows={pandemicContactsList || []}
              recordsPerPage={2}
              handleChangeCurrentPage={(data) => changeCurrentPage(data)}
              handleEdit={null}
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default TraceOrganizationContacts;
