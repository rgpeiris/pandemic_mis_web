import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import { checkStringValidity, DOSE_LIST, NEXT_DOSE_LIST } from "../../utils";

import { updateVaccine } from "../../store/actions";

const UpdateVaccine = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [vaccineId, setVaccineId] = useState("");
  const [vaccineName, setVaccineName] = useState("");
  const [isValidVaccineName, setIsValidVaccineName] = useState(true);
  const [dose, setDose] = useState("");
  const [isValidDose, setIsValidDose] = useState(true);
  const [isClearDose, setIsClearDose] = useState(false);
  const [nextDose, setNextDose] = useState("");
  const [isValidNextDose, setIsValidNextDose] = useState(true);
  const [isClearNextDose, setIsClearNextDose] = useState(false);

  const { isUpdatingVaccine, covidVaccineById, isGettingVaccineById } =
    useSelector((state) => state.covidVaccine);

  useEffect(() => {
    if (covidVaccineById) {
      setVaccineId(covidVaccineById?.vaccineId);
      setVaccineName(covidVaccineById?.vaccineName);
      setDose(covidVaccineById?.dose);
      setNextDose(covidVaccineById?.nextDose);
      setIsValidVaccineName(true);
      setIsValidDose(true);
      setIsClearDose(true);
      setIsValidNextDose(true);
      setIsClearNextDose(true);
    }
  }, [covidVaccineById]);

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
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      vaccineId,
      vaccineName,
      dose,
      nextDose,
      createdDate: covidVaccineById?.createdDate,
      createdBy: covidVaccineById?.createdBy,
    };

    dispatch(updateVaccine(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingVaccineById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Vaccine"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Vaccine Name"}
                placeholder={"Enter Vaccine Name"}
                inputProps={{ maxLength: 50 }}
                value={vaccineName || ""}
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
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingVaccine}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateVaccine;
