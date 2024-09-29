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
  checkStringValidity,
  checkContactValidity,
  STATUS_LIST,
} from "../../utils";

import { updateHealthcareProfessional } from "../../store/actions";

const UpdateHealthcareProfessional = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [healthcareProfessionalId, setHealthcareProfessionalId] = useState("");
  const [name, setName] = useState("");
  const [medicalSpecialty, setMedicalSpecialty] = useState("");
  const [isValidMedicalSpecialty, setIsValidMedicalSpecialty] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [assignedUsername, setAssignedUsername] = useState("");
  const [isValidAssignedUsername, setIsValidAssignedUsername] = useState(true);
  const [hospital, setHospital] = useState("");
  const [isValidHospital, setIsValidHospital] = useState(true);
  const [isClearHospital, setIsClearHospital] = useState(false);
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const {
    isUpdatingHealthcareProfessional,
    hospitals,
    healthcareProfessionalById,
    isGettingHealthcareProfessionalById,
    isGettingHospitals,
  } = useSelector((state) => state.covidPatient);

  useEffect(() => {
    if (healthcareProfessionalById) {
      setHealthcareProfessionalId(
        healthcareProfessionalById?.healthcareProfessionalId
      );
      setName(healthcareProfessionalById?.healthcareProfessionalName);
      setMedicalSpecialty(healthcareProfessionalById?.medicalSpecialty);
      setPhoneNumber(healthcareProfessionalById?.phoneNumber);
      setAssignedUsername(healthcareProfessionalById?.assignedUsername);
      setStatus(healthcareProfessionalById?.isActive ? "Active" : "Inactive");
      setHospital(healthcareProfessionalById?.assignedHospital);
      setIsValidMedicalSpecialty(true);
      setIsValidPhoneNumber(true);
      setIsValidAssignedUsername(true);
      setIsValidStatus(true);
      setIsClearStatus(true);
      setIsValidHospital(true);
      setIsClearHospital(true);
    }
  }, [healthcareProfessionalById]);

  const onHandleMedicalSpecialty = (e) => {
    setIsValidMedicalSpecialty(true);
    setMedicalSpecialty(e.target.value);
  };

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const onHandleAssignedUsername = (e) => {
    setIsValidAssignedUsername(true);
    setAssignedUsername(e.target.value);
  };

  const onHandleHospital = (e) => {
    setIsClearHospital(true);
    setIsValidHospital(true);
    setHospital(e.target.value);
  };

  const onHandleClearHospital = () => {
    setHospital("");
    setIsValidHospital(true);
    setIsClearHospital(false);
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

    if (!checkStringValidity(medicalSpecialty)) {
      setIsValidMedicalSpecialty(false);
      isErrorValidation = true;
    }
    if (!checkContactValidity(phoneNumber)) {
      setIsValidPhoneNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(hospital)) {
      setIsValidHospital(false);
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
      healthcareProfessionalId,
      healthcareProfessionalName: name,
      medicalSpecialty,
      assignedHospital: hospital,
      phoneNumber,
      assignedUsername,
      isActive: status === "Active" ? true : false,
      createdDate: healthcareProfessionalById?.createdDate,
      createdBy: healthcareProfessionalById?.createdBy,
    };

    dispatch(updateHealthcareProfessional(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingHealthcareProfessionalById || isGettingHospitals ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Healthcare Professional"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Healthcare Professional Name"}
                value={name || ""}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Medical Specialty"}
                placeholder={"Enter Medical Specialty"}
                inputProps={{ maxLength: 100 }}
                value={medicalSpecialty || ""}
                onChange={onHandleMedicalSpecialty}
                error={!isValidMedicalSpecialty}
                helperText={!isValidMedicalSpecialty && "* Required Field"}
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
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Assigned Hospital *"}
                isShowPlaceholder
                menuItemValue={"hospitalId"}
                menuItemText={"hospitalName"}
                value={hospital || ""}
                selectData={hospitals}
                onChange={onHandleHospital}
                isValid={isValidHospital}
                handleClear={onHandleClearHospital}
                isClear={isClearHospital}
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
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Assigned Username"}
                placeholder={"Enter Assigned Username"}
                inputProps={{ maxLength: 100 }}
                value={assignedUsername || ""}
                onChange={onHandleAssignedUsername}
                error={!isValidAssignedUsername}
                helperText={!isValidAssignedUsername && "* Required Field"}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingHealthcareProfessional}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateHealthcareProfessional;
