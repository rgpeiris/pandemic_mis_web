import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, TextField, Typography } from "@mui/material";
import moment from "moment";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";

import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";
import ErrorPage from "../../components/errorPage";

import { Assets } from "../../assets/images";

import {
  checkStringValidity,
  checkContactValidity,
  checkNICValidity,
} from "../../utils";

import {
  createPandemicContactPublic,
  getOrganizations,
} from "../../store/actions";

const CheckInOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { organizationId } = useParams();

  const [organization, setOrganization] = useState("");
  const [isValidOrganization, setIsValidOrganization] = useState(true);
  const [isClearOrganization, setIsClearOrganization] = useState(false);
  const [fullName, setFullName] = useState("");
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [nicNumber, setNicNumber] = useState("");
  const [isValidNicNumber, setIsValidNicNumber] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [time, setTime] = useState(new Date());

  const {
    isGettingOrganizations,
    isErrorGettingOrganizations,
    organizations,
    isCreatingPandemicContactPublic,
  } = useSelector((state) => state.covidContact);

  useEffect(() => {
    dispatch(getOrganizations());

    if (organizationId !== "0") setOrganization(organizationId);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const onHandleFullName = (e) => {
    setIsValidFullName(true);
    setFullName(e.target.value);
  };

  const onHandleNicNumber = (e) => {
    setIsValidNicNumber(true);
    setNicNumber(e.target.value);
  };

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const onHandleAddress = (e) => {
    setIsValidAddress(true);
    setAddress(e.target.value);
  };

  const onHandleOrganization = (e) => {
    setIsValidOrganization(true);
    setIsClearOrganization(true);
    setOrganization(e.target.value);
  };

  const onHandleClearOrganization = () => {
    setOrganization("");
    setIsClearOrganization(false);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkNICValidity(nicNumber)) {
      setIsValidNicNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(fullName)) {
      setIsValidFullName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(address)) {
      setIsValidAddress(false);
      isErrorValidation = true;
    }
    if (!checkContactValidity(phoneNumber)) {
      setIsValidPhoneNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(organization)) {
      setIsValidOrganization(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const userData = {
      pandemicContactId: 0,
      nicNumber,
      name: fullName,
      address,
      phoneNumber,
      checkInTime: new Date().toISOString(),
      checkOutTime: new Date().toISOString(),
      organizationId: organization,
      createdBy: "app_user",
      createdDate: new Date().toISOString(),
    };

    dispatch(createPandemicContactPublic(userData, navigate));
  };

  const onHandleCancel = () => {
    navigate("/stay-safe");
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
      </Box>
      <Box
        sx={{
          width: "870px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          padding: "25px",
        }}
      >
        {isGettingOrganizations ? (
          <Loading />
        ) : isErrorGettingOrganizations ? (
          <ErrorPage onHandleReload={() => navigate(0)} />
        ) : (
          <FormWrapper onSubmit={checkValidity}>
            <Grid container spacing={2}>
              <Grid item sm={12} xs={12}>
                <Heading title={"Check-In/Check-Out"} />
                <Typography
                  fontSize="14px"
                  align="justify"
                  color="text.secondary"
                  sx={{ mt: 2, mb: 1 }}
                >
                  By registering with "Aarogya", you will be fulfilling your
                  duty as a Corporate Citizen and also benefit by doing so in
                  more ways than one. Aarogya will help to avoid unnecessary
                  problems by sharing your personal information. "Aarogya" will
                  keep you and your personal data safe.
                </Typography>
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  label={"NIC Number"}
                  placeholder={"Enter NIC Number"}
                  inputProps={{ maxLength: 50 }}
                  value={nicNumber}
                  onChange={onHandleNicNumber}
                  error={!isValidNicNumber}
                  helperText={
                    !isValidNicNumber
                      ? nicNumber
                        ? "Please enter a valid NIC number"
                        : "* Required Field"
                      : ""
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  label={"Full Name"}
                  placeholder={"Enter Full Name"}
                  inputProps={{ maxLength: 150 }}
                  value={fullName}
                  onChange={onHandleFullName}
                  error={!isValidFullName}
                  helperText={!isValidFullName && "* Required Field"}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextField
                  required
                  fullWidth
                  label={"Phone Number"}
                  placeholder={"Enter Phone Number"}
                  inputProps={{ maxLength: 50 }}
                  value={phoneNumber}
                  onChange={onHandlePhoneNumber}
                  error={!isValidPhoneNumber}
                  helperText={
                    !isValidPhoneNumber
                      ? phoneNumber
                        ? "Please enter a valid Phone number"
                        : "* Required Field"
                      : ""
                  }
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomSelect
                  fullWidth
                  disabled={organizationId !== "0"}
                  label={
                    organizationId !== "0"
                      ? "Organization Name"
                      : "Organization Name *"
                  }
                  menuItemValue={"organizationId"}
                  menuItemText={"organizationName"}
                  isShowPlaceholder
                  value={organization || ""}
                  selectData={organizations?.filter((x) => x.isActive === true)}
                  onChange={onHandleOrganization}
                  isValid={isValidOrganization}
                  handleClear={onHandleClearOrganization}
                  isClear={isClearOrganization}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextField
                  required
                  fullWidth
                  label={"Address"}
                  placeholder={"Enter Address"}
                  inputProps={{ maxLength: 150 }}
                  value={address}
                  multiline
                  rows={3}
                  onChange={onHandleAddress}
                  error={!isValidAddress}
                  helperText={!isValidAddress && "* Required Field"}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    p: 2,
                    backgroundColor: "#EFF5FB",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      justifyContent: "center",
                      mr: 2,
                    }}
                  >
                    <Typography fontSize="20px" fontWeight="600">
                      {moment().format("dddd")}
                    </Typography>
                    <Typography fontSize="14px">
                      {moment().format("Do MMMM YYYY, h:mm:ss A")}
                    </Typography>
                  </Box>
                  <Clock value={time} />
                </Box>
              </Grid>
            </Grid>
            <FormActionButton
              title={"Check-In/Out"}
              onCancelClick={onHandleCancel}
              loading={isCreatingPandemicContactPublic}
            />
          </FormWrapper>
        )}
      </Box>
    </Box>
  );
};

export default CheckInOut;
