import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField, Autocomplete } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import { checkStringValidity } from "../../utils";

import { createScheduledVaccinationCentre } from "../../store/actions";

const CreateScheduledVaccinationCentre = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [center, setCenter] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [isValidCenter, setIsValidCenter] = useState(true);
  const [dateScheduled, setDateScheduled] = useState("");
  const [isValidDateScheduled, setIsValidDateScheduled] = useState(true);
  const [availableCapacity, setAvailableCapacity] = useState("");
  const [isValidAvailableCapacity, setIsValidAvailableCapacity] =
    useState(true);

  const { loggedInUser } = useSelector((state) => state.auth);
  const {
    isCreatingScheduledVaccinationCentre,
    vaccinationCentres,
    isGettingVaccinationCentres,
  } = useSelector((state) => state.covidVaccine);

  const onHandleCenter = (e, newValue) => {
    setIsValidCenter(true);
    setSelectedCenter(newValue);
    setCenter(newValue != null ? newValue.vaccinationCentreId : "");
  };

  const onHandleDateScheduled = (e) => {
    setIsValidDateScheduled(true);
    setDateScheduled(e.target.value);
  };

  const onHandleAvailableCapacity = (e) => {
    setIsValidAvailableCapacity(true);
    setAvailableCapacity(e.target.value);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(center)) {
      setIsValidCenter(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(dateScheduled)) {
      setIsValidDateScheduled(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(availableCapacity)) {
      setIsValidAvailableCapacity(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      scheduledVaccinationCentreId: 0,
      vaccinationCentreId: center,
      centreName: selectedCenter?.centreName,
      dateScheduled,
      timeScheduled: "Forenoon/Afternoon",
      availableCapacity,
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createScheduledVaccinationCentre(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingVaccinationCentres ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Schedule Vaccination Center"} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Autocomplete
                value={selectedCenter}
                onChange={onHandleCenter}
                options={vaccinationCentres || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="Vaccination Center"
                    placeholder="Search Vaccination Center"
                    variant="outlined"
                    error={!isValidCenter}
                    helperText={!isValidCenter && "* Required Field"}
                  />
                )}
                getOptionLabel={(option) => option.centreName || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                label={"Date Scheduled"}
                type="date"
                value={dateScheduled}
                onChange={onHandleDateScheduled}
                error={!isValidDateScheduled}
                helperText={!isValidDateScheduled && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Time Scheduled"}
                value={"Forenoon/Afternoon"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Available Capacity"}
                placeholder={"Enter Available Capacity"}
                inputProps={{ maxLength: 50 }}
                value={availableCapacity}
                onChange={onHandleAvailableCapacity}
                error={!isValidAvailableCapacity}
                helperText={!isValidAvailableCapacity && "* Required Field"}
              />
            </Grid>
          </Grid>
          <FormActionButton
            onCancelClick={onHandleCancel}
            loading={isCreatingScheduledVaccinationCentre}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default CreateScheduledVaccinationCentre;
