import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";

import {
  checkStringValidity,
  checkContactValidity,
  DISTRICT_LIST,
} from "../../utils";

import { createGovOfficersInCharge } from "../../store/actions";

const CreateGovOfficerInCharge = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [designation, setDesignation] = useState("");
  const [isValidDesignation, setIsValidDesignation] = useState(true);
  const [district, setDistrict] = useState("");
  const [isValidDistrict, setIsValidDistrict] = useState(true);
  const [isClearDistrict, setIsClearDistrict] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [assignedUsername, setAssignedUsername] = useState("");
  const [isValidAssignedUsername, setIsValidAssignedUsername] = useState(true);

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isCreatingGovOfficerInCharge } = useSelector(
    (state) => state.covidPatient
  );

  const onHandleName = (e) => {
    setIsValidName(true);
    setName(e.target.value);
  };

  const onHandleDesignation = (e) => {
    setIsValidDesignation(true);
    setDesignation(e.target.value);
  };

  const onHandleDistrict = (e) => {
    setIsValidDistrict(true);
    setIsClearDistrict(true);
    setDistrict(e.target.value);
  };

  const onHandleClearDistrict = () => {
    setDistrict("");
    setIsClearDistrict(false);
  };

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const onHandleAssignedUsername = (e) => {
    setIsValidAssignedUsername(true);
    setAssignedUsername(e.target.value);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(name)) {
      setIsValidName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(designation)) {
      setIsValidDesignation(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(district)) {
      setIsValidDistrict(false);
      isErrorValidation = true;
    }
    if (!checkContactValidity(phoneNumber)) {
      setIsValidPhoneNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(assignedUsername)) {
      setIsValidAssignedUsername(false);
      isErrorValidation = true;
    }

    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      localGovernmentInChargeId: 0,
      localGovernmentInChargeName: name,
      designation,
      assignedDistrict: district,
      phoneNumber,
      assignedUsername,
      isActive: true,
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createGovOfficersInCharge(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create Government Officer In Charge"} />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Government Officer In Charge Name"}
              placeholder={"Enter Government Officer In Charge Name"}
              inputProps={{ maxLength: 150 }}
              value={name}
              multiline
              rows={3}
              onChange={onHandleName}
              error={!isValidName}
              helperText={!isValidName && "* Required Field"}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Designation"}
              placeholder={"Enter Designation"}
              inputProps={{ maxLength: 100 }}
              value={designation}
              onChange={onHandleDesignation}
              error={!isValidDesignation}
              helperText={!isValidDesignation && "* Required Field"}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CustomSelect
              fullWidth
              label={"District *"}
              isShowPlaceholder
              value={district || ""}
              selectData={DISTRICT_LIST}
              onChange={onHandleDistrict}
              isValid={isValidDistrict}
              handleClear={onHandleClearDistrict}
              isClear={isClearDistrict}
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
            <TextField
              required
              fullWidth
              label={"Assigned Username"}
              placeholder={"Enter Assigned Username"}
              inputProps={{ maxLength: 100 }}
              value={assignedUsername}
              onChange={onHandleAssignedUsername}
              error={!isValidAssignedUsername}
              helperText={!isValidAssignedUsername && "* Required Field"}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField disabled fullWidth label={"Status"} value={"Active"} />
          </Grid>
        </Grid>
        <FormActionButton
          onCancelClick={onHandleCancel}
          loading={isCreatingGovOfficerInCharge}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateGovOfficerInCharge;
