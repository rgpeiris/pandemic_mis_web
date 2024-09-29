import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import { checkStringValidity, checkContactValidity } from "../../utils";

import { createHealthcareProfessional } from "../../store/actions";

const CreateHealthcareProfessional = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [medicalSpecialty, setMedicalSpecialty] = useState("");
  const [isValidMedicalSpecialty, setIsValidMedicalSpecialty] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [assignedUsername, setAssignedUsername] = useState("");
  const [isValidAssignedUsername, setIsValidAssignedUsername] = useState(true);
  const [hospital, setHospital] = useState("");
  const [isValidHospital, setIsValidHospital] = useState(true);
  const [isClearHospital, setIsClearHospital] = useState(false);

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isCreatingHealthcareProfessional, hospitals, isGettingHospitals } =
    useSelector((state) => state.covidPatient);

  const onHandleName = (e) => {
    setIsValidName(true);
    setName(e.target.value);
  };

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

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(name)) {
      setIsValidName(false);
      isErrorValidation = true;
    }
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
      healthcareProfessionalId: 0,
      healthcareProfessionalName: name,
      medicalSpecialty,
      assignedHospital: hospital,
      phoneNumber,
      assignedUsername,
      isActive: true,
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createHealthcareProfessional(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingHospitals ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Create Healthcare Professional"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Healthcare Professional Name"}
                placeholder={"Enter Healthcare Professional Name"}
                inputProps={{ maxLength: 150 }}
                value={name}
                multiline
                rows={3}
                onChange={onHandleName}
                error={!isValidName}
                helperText={!isValidName && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Medical Specialty"}
                placeholder={"Enter Medical Specialty"}
                inputProps={{ maxLength: 100 }}
                value={medicalSpecialty}
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
              <TextField disabled fullWidth label={"Status"} value={"Active"} />
            </Grid>
            <Grid item sm={12} xs={12}>
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
          </Grid>
          <FormActionButton
            onCancelClick={onHandleCancel}
            loading={isCreatingHealthcareProfessional}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default CreateHealthcareProfessional;
