import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, TextField, Typography } from "@mui/material";

import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";

import { Assets } from "../../assets/images";

import {
  ORGANIZATION_TYPES_LIST,
  checkStringValidity,
  checkContactValidity,
  checkEmailValidity,
} from "../../utils";

import { registerOrganizationPublic } from "../../store/actions";

const CreateOrganizationPublic = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [organizationName, setOrganizationName] = useState("");
  const [isValidOrganizationName, setIsValidOrganizationName] = useState(true);
  const [organizationType, setOrganizationType] = useState("");
  const [isValidOrganizationType, setIsValidOrganizationType] = useState(true);
  const [isClearOrganizationType, setIsClearOrganizationType] = useState(false);
  const [contactName, setContactName] = useState("");
  const [isValidContactName, setIsValidContactName] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const { isRegisteringOrganizationPublic } = useSelector(
    (state) => state.covidContact
  );

  const onHandleOrganizationName = (e) => {
    setIsValidOrganizationName(true);
    setOrganizationName(e.target.value);
  };

  const onHandleOrganizationType = (e) => {
    setIsValidOrganizationType(true);
    setIsClearOrganizationType(true);
    setOrganizationType(e.target.value);
  };

  const onHandleClearOrganizationType = () => {
    setOrganizationType("");
    setIsClearOrganizationType(false);
  };

  const onHandleContactName = (e) => {
    setIsValidContactName(true);
    setContactName(e.target.value);
  };

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const onHandleAddress = (e) => {
    setIsValidAddress(true);
    setAddress(e.target.value);
  };

  const onHandleEmail = (e) => {
    setIsValidEmail(true);
    setEmail(e.target.value);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(organizationName)) {
      setIsValidOrganizationName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(organizationType)) {
      setIsValidOrganizationType(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(contactName)) {
      setIsValidContactName(false);
      isErrorValidation = true;
    }
    if (!checkEmailValidity(email)) {
      setIsValidEmail(false);
      isErrorValidation = true;
    }
    if (!checkContactValidity(phoneNumber)) {
      setIsValidPhoneNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(address)) {
      setIsValidAddress(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const userData = {
      organizationId: 0,
      organizationName,
      organizationType,
      contactName,
      email,
      phoneNumber,
      address,
      isActive: true,
      createdBy: "app_user",
      createdDate: new Date().toISOString(),
    };

    dispatch(registerOrganizationPublic(userData, navigate));
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
          width: "900px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "8px",
          backgroundColor: "#FFFFFF",
          padding: "25px",
        }}
      >
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Register Your Organization"} />
              <Typography
                fontSize="14px"
                align="justify"
                color="text.secondary"
                sx={{ mt: 2, mb: 1 }}
              >
                By registering with "Aarogya", you will be fulfilling your duty
                as a Corporate Citizen and also benefit by doing so in more ways
                than one. Aarogya will help contain, control and avoid the
                spread of COVID-19 at your workplace while also ensuring
                efficient check-ins and check-outs, among other benefits.
              </Typography>
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Organization Name"}
                placeholder={"Enter Organization Name"}
                inputProps={{ maxLength: 250 }}
                value={organizationName}
                multiline
                rows={2}
                onChange={onHandleOrganizationName}
                error={!isValidOrganizationName}
                helperText={!isValidOrganizationName && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Organization Type *"}
                isShowPlaceholder
                value={organizationType || ""}
                selectData={ORGANIZATION_TYPES_LIST}
                onChange={onHandleOrganizationType}
                isValid={isValidOrganizationType}
                handleClear={onHandleClearOrganizationType}
                isClear={isClearOrganizationType}
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
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Contact Person Name"}
                placeholder={"Enter Contact Person Name"}
                inputProps={{ maxLength: 150 }}
                value={contactName}
                onChange={onHandleContactName}
                error={!isValidContactName}
                helperText={!isValidContactName && "* Required Field"}
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
              <TextField
                required
                fullWidth
                label={"Email"}
                placeholder={"Enter Email"}
                inputProps={{ maxLength: 100 }}
                value={email}
                onChange={onHandleEmail}
                error={!isValidEmail}
                helperText={
                  !isValidEmail
                    ? email
                      ? "Please enter a valid Email"
                      : "* Required Field"
                    : ""
                }
              />
            </Grid>
          </Grid>
          <FormActionButton
            title={"Register"}
            onCancelClick={onHandleCancel}
            loading={isRegisteringOrganizationPublic}
          />
        </FormWrapper>
      </Box>
    </Box>
  );
};

export default CreateOrganizationPublic;
