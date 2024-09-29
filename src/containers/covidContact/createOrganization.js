import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";

import {
  ORGANIZATION_TYPES_LIST,
  checkStringValidity,
  checkContactValidity,
  checkEmailValidity,
} from "../../utils";

import { registerOrganization } from "../../store/actions";

const CreateOrganization = ({ isOpen, handleClose }) => {
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

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isRegisteringOrganization } = useSelector(
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
      createdBy: loggedInUser.userName,
      createdDate: new Date().toISOString(),
    };

    dispatch(registerOrganization(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create Organization"} />
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
          <Grid item sm={6} xs={12}>
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
          <Grid item sm={6} xs={12}>
            <TextField disabled fullWidth label={"Status"} value={"Active"} />
          </Grid>
        </Grid>
        <FormActionButton
          onCancelClick={onHandleCancel}
          loading={isRegisteringOrganization}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateOrganization;
