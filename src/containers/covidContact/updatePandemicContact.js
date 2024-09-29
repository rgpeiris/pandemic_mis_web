import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import { checkStringValidity, checkContactValidity } from "../../utils";

import { updatePandemicContact } from "../../store/actions";

const UpdatePandemicContact = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [pandemicContactId, setPandemicContactId] = useState("");
  const [fullName, setFullName] = useState("");
  const [nicNumber, setNicNumber] = useState("");
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

  const {
    isGettingOrganizations,
    organizations,
    pandemicContactById,
    isGettingPandemicContactById,
    isUpdatingPandemicContact,
  } = useSelector((state) => state.covidContact);

  useEffect(() => {
    if (pandemicContactById) {
      setPandemicContactId(pandemicContactById?.pandemicContactId);
      setFullName(pandemicContactById?.name);
      setNicNumber(pandemicContactById?.nicNumber);
      setPhoneNumber(pandemicContactById?.phoneNumber);
      setAddress(pandemicContactById?.address);
      setCheckInTime(pandemicContactById?.checkInTime?.split("T")[0]);
      setCheckOutTime(pandemicContactById?.checkOutTime?.split("T")[0]);
      setOrganization(pandemicContactById?.organizationId);
      setIsClearOrganization(true);
    }
  }, [pandemicContactById]);

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
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const userData = {
      pandemicContactId,
      nicNumber,
      name: fullName,
      address,
      phoneNumber,
      checkInTime,
      checkOutTime,
      organizationId: organization,
      createdBy: pandemicContactById?.createdBy,
      createdDate: pandemicContactById?.createdDate,
    };

    dispatch(updatePandemicContact(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingOrganizations || isGettingPandemicContactById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Contact"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Full Name"}
                value={fullName || ""}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"NIC Number"}
                value={nicNumber || ""}
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
                value={checkInTime || ""}
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
                value={checkOutTime || ""}
                onChange={onHandleCheckOutTime}
                error={!isValidCheckOutTime}
                helperText={!isValidCheckOutTime && "* Required Field"}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingPandemicContact}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdatePandemicContact;
