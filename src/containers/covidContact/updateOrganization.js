import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import {
  ORGANIZATION_TYPES_LIST,
  STATUS_LIST,
  checkContactValidity,
  checkEmailValidity,
  checkStringValidity,
} from "../../utils";

import { updateOrganization } from "../../store/actions";

const UpdateOrganization = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [organizationId, setOrganizationId] = useState("");
  const [organizationName, setOrganizationName] = useState("");
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
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const {
    organizationById,
    isGettingOrganizationById,
    isUpdatingOrganization,
  } = useSelector((state) => state.covidContact);

  useEffect(() => {
    if (organizationById) {
      setOrganizationId(organizationById?.organizationId);
      setOrganizationName(organizationById?.organizationName);
      setOrganizationType(organizationById?.organizationType);
      setContactName(organizationById?.contactName);
      setPhoneNumber(organizationById?.phoneNumber);
      setAddress(organizationById?.address);
      setEmail(organizationById?.email);
      setStatus(organizationById?.isActive ? "Active" : "Inactive");
      setIsClearStatus(true);
    }
  }, [organizationById]);

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

  const onHandleStatus = (e) => {
    setIsValidStatus(true);
    setIsClearStatus(true);
    setStatus(e.target.value);
  };

  const onHandleClearStatus = () => {
    setStatus("");
    setIsClearStatus(false);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

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
    if (!checkStringValidity(status)) {
      setIsValidStatus(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const userData = {
      organizationId,
      organizationName,
      organizationType,
      contactName,
      email,
      phoneNumber,
      address,
      isActive: status === "Active" ? true : false,
      createdBy: organizationById?.createdBy,
      createdDate: organizationById?.createdDate,
    };

    dispatch(updateOrganization(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingOrganizationById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Organization"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Organization Name"}
                value={organizationName || ""}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                disabled
                label={"Organization Type"}
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
                value={phoneNumber || ""}
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
                value={contactName || ""}
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
                value={address || ""}
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
                value={email || ""}
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
              <CustomSelect
                fullWidth
                label={"Status *"}
                isShowPlaceholder
                value={status || ""}
                selectData={STATUS_LIST}
                onChange={onHandleStatus}
                isValid={isValidStatus}
                handleClear={onHandleClearStatus}
                isClear={isClearStatus}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingOrganization}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateOrganization;
