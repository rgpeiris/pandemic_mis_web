import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";

import { checkStringValidity, DOSE_LIST, NEXT_DOSE_LIST } from "../../utils";

import { createVaccine } from "../../store/actions";

const CreateVaccine = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [vaccineName, setVaccineName] = useState("");
  const [isValidVaccineName, setIsValidVaccineName] = useState(true);
  const [dose, setDose] = useState("");
  const [isValidDose, setIsValidDose] = useState(true);
  const [isClearDose, setIsClearDose] = useState(false);
  const [nextDose, setNextDose] = useState("");
  const [isValidNextDose, setIsValidNextDose] = useState(true);
  const [isClearNextDose, setIsClearNextDose] = useState(false);

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isCreatingVaccine } = useSelector((state) => state.covidVaccine);

  const onHandleVaccineName = (e) => {
    setIsValidVaccineName(true);
    setVaccineName(e.target.value);
  };

  const onHandleDose = (e) => {
    setIsValidDose(true);
    setIsClearDose(true);
    setDose(e.target.value);
  };

  const onHandleClearDose = () => {
    setDose("");
    setIsClearDose(false);
  };

  const onHandleNextDose = (e) => {
    setIsValidNextDose(true);
    setIsClearNextDose(true);
    setNextDose(e.target.value);
  };

  const onHandleClearNextDose = () => {
    setNextDose("");
    setIsClearNextDose(false);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(vaccineName)) {
      setIsValidVaccineName(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(dose)) {
      setIsValidDose(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(nextDose)) {
      setIsValidNextDose(false);
      isErrorValidation = true;
    }

    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      vaccineId: 0,
      vaccineName,
      dose,
      nextDose,
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createVaccine(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create Vaccine"} />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Vaccine Name"}
              placeholder={"Enter Vaccine Name"}
              inputProps={{ maxLength: 50 }}
              value={vaccineName}
              onChange={onHandleVaccineName}
              error={!isValidVaccineName}
              helperText={!isValidVaccineName && "* Required Field"}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CustomSelect
              fullWidth
              label={"Dose *"}
              isShowPlaceholder
              value={dose || ""}
              selectData={DOSE_LIST}
              onChange={onHandleDose}
              isValid={isValidDose}
              handleClear={onHandleClearDose}
              isClear={isClearDose}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <CustomSelect
              fullWidth
              label={"Next Dose *"}
              isShowPlaceholder
              value={nextDose || ""}
              selectData={NEXT_DOSE_LIST}
              onChange={onHandleNextDose}
              isValid={isValidNextDose}
              handleClear={onHandleClearNextDose}
              isClear={isClearNextDose}
            />
          </Grid>
        </Grid>
        <FormActionButton
          onCancelClick={onHandleCancel}
          loading={isCreatingVaccine}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateVaccine;
