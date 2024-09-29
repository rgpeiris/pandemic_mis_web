import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import {
  checkStringValidity,
  checkContactValidity,
  checkNICValidity,
} from "../../utils";

import { createPandemicContact } from "../../store/actions";

const CreatePandemicContact = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [isValidFullName, setIsValidFullName] = useState(true);
  const [nicNumber, setNicNumber] = useState("");
  const [isValidNicNumber, setIsValidNicNumber] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [address, setAddress] = useState("");
  const [isValidAddress, setIsValidAddress] = useState(true);
  const [checkInTime, setCheckInTime] = useState("");
  const [isValidCheckInTime, setIsValidCheckInTime] = useState(true);
  const [checkOutTime, setCheckOutTime] = useState("");
  const [isValidCheckOutTime, setIsValidCheckOutTime] = useState(true);
  const [organization, setOrganization] = useState("");
  const [isValidOrganization, setIsValidOrganization] = useState(true);
  const [isClearOrganization, setIsClearOrganization] = useState(false);

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isGettingOrganizations, organizations, isCreatingPandemicContact } =
    useSelector((state) => state.covidContact);

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

  const onHandleCheckInTime = (e) => {
    setIsValidCheckInTime(true);
    setCheckInTime(e.target.value);
  };

  const onHandleCheckOutTime = (e) => {
    setIsValidCheckOutTime(true);
    setCheckOutTime(e.target.value);
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
    if (!checkStringValidity(checkInTime)) {
      setIsValidCheckInTime(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(checkOutTime)) {
      setIsValidCheckOutTime(false);
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
      checkInTime,
      checkOutTime,
      organizationId: organization,
      createdBy: loggedInUser.userName,
      createdDate: new Date().toISOString(),
    };

    dispatch(createPandemicContact(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingOrganizations ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Create Contact"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Full Name"}
                placeholder={"Enter Full Name"}
                inputProps={{ maxLength: 150 }}
                value={fullName}
                multiline
                rows={2}
                onChange={onHandleFullName}
                error={!isValidFullName}
                helperText={!isValidFullName && "* Required Field"}
              />
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
              <CustomSelect
                fullWidth
                label={"Organization *"}
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
            <Grid item sm={3} xs={12}>
              <TextField
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label={"Check-In"}
                placeholder={"Enter Check-In"}
                inputProps={{ maxLength: 50 }}
                value={checkInTime}
                onChange={onHandleCheckInTime}
                error={!isValidCheckInTime}
                helperText={!isValidCheckInTime && "* Required Field"}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <TextField
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                type="date"
                label={"Check-Out"}
                placeholder={"Enter Check-Out"}
                inputProps={{ maxLength: 50 }}
                value={checkOutTime}
                onChange={onHandleCheckOutTime}
                error={!isValidCheckOutTime}
                helperText={!isValidCheckOutTime && "* Required Field"}
              />
            </Grid>
          </Grid>
          <FormActionButton
            onCancelClick={onHandleCancel}
            loading={isCreatingPandemicContact}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default CreatePandemicContact;
