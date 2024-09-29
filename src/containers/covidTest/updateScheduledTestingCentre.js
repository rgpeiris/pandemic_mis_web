import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import { checkStringValidity } from "../../utils";

import { upateScheduledTestCentre } from "../../store/actions";

const UpdateScheduledTestingCentre = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [scheduledTestCentreId, setScheduledTestCentreId] = useState("");
  const [center, setCenter] = useState("");
  const [dateScheduled, setDateScheduled] = useState("");
  const [isValidDateScheduled, setIsValidDateScheduled] = useState(true);
  const [availableCapacity, setAvailableCapacity] = useState("");
  const [isValidAvailableCapacity, setIsValidAvailableCapacity] =
    useState(true);

  const {
    isUpdatingScheduledTestCentre,
    scheduledTestCentreById,
    isGettingScheduledTestCentreById,
  } = useSelector((state) => state.covidTest);

  useEffect(() => {
    if (scheduledTestCentreById) {
      setScheduledTestCentreId(scheduledTestCentreById?.scheduledTestCentreId);
      setCenter(scheduledTestCentreById?.centreName);
      setDateScheduled(scheduledTestCentreById?.dateScheduled?.split("T")[0]);
      setAvailableCapacity(scheduledTestCentreById?.availableCapacity);
      setIsValidDateScheduled(true);
      setIsValidAvailableCapacity(true);
    }
  }, [scheduledTestCentreById]);

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

    if (!checkStringValidity(dateScheduled)) {
      setIsValidDateScheduled(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(availableCapacity)) {
      setIsValidAvailableCapacity(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      scheduledTestCentreId,
      testCentreId: scheduledTestCentreById?.testCentreId,
      centreName: scheduledTestCentreById?.centreName,
      dateScheduled,
      timeScheduled: "Forenoon/Afternoon",
      availableCapacity,
      createdDate: scheduledTestCentreById?.createdDate,
      createdBy: scheduledTestCentreById?.createdBy,
    };

    dispatch(upateScheduledTestCentre(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingScheduledTestCentreById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Scheduled Testing Center"} />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Vaccination Center"}
                value={center || ""}
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
                value={dateScheduled || ""}
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
                value={availableCapacity || ""}
                onChange={onHandleAvailableCapacity}
                error={!isValidAvailableCapacity}
                helperText={!isValidAvailableCapacity && "* Required Field"}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingScheduledTestCentre}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateScheduledTestingCentre;
