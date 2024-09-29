import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";
import moment from "moment";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import { APPOINTMENTS_STATUS_LIST, checkStringValidity } from "../../utils";

import { updateVaccineAppointment } from "../../store/actions";

const UpdateVaccinationAppointment = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const {
    isUpdatingVaccineAppointment,
    isGettingVaccineAppointmentById,
    vaccineAppointmentById,
  } = useSelector((state) => state.covidVaccine);

  useEffect(() => {
    if (vaccineAppointmentById) {
      setStatus(vaccineAppointmentById?.status);
      setIsValidStatus(true);
      setIsClearStatus(true);
    }
  }, [vaccineAppointmentById]);

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
      vaccineAppointmentId: vaccineAppointmentById?.vaccineAppointmentId,
      name: vaccineAppointmentById?.name,
      nicNumber: vaccineAppointmentById?.nicNumber,
      age: vaccineAppointmentById?.age,
      birthYear: vaccineAppointmentById?.birthYear,
      gender: vaccineAppointmentById?.gender,
      address: vaccineAppointmentById?.address,
      phoneNumber: vaccineAppointmentById?.phoneNumber,
      isRequiredReports: vaccineAppointmentById?.isRequiredReports,
      vaccinationCentreId: vaccineAppointmentById?.vaccinationCentreId,
      dateScheduled: vaccineAppointmentById?.dateScheduled,
      timeScheduled: vaccineAppointmentById?.timeScheduled,
      status,
      createdBy: vaccineAppointmentById?.createdBy,
      createdDate: vaccineAppointmentById?.createdDate,
    };

    dispatch(updateVaccineAppointment(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingVaccineAppointmentById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Vaccination Appointment"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Name"}
                value={vaccineAppointmentById?.name || ""}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"NIC Number"}
                value={vaccineAppointmentById?.nicNumber || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Age"}
                value={vaccineAppointmentById?.age || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Gender"}
                value={vaccineAppointmentById?.gender || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Phone Number"}
                value={vaccineAppointmentById?.phoneNumber || ""}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Address"}
                value={vaccineAppointmentById?.address || ""}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Vaccination Center Name"}
                value={vaccineAppointmentById?.centreName || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Status *"}
                isShowPlaceholder
                value={status || ""}
                selectData={APPOINTMENTS_STATUS_LIST}
                onChange={onHandleStatus}
                isValid={isValidStatus}
                handleClear={onHandleClearStatus}
                isClear={isClearStatus}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Date Scheduled"}
                value={
                  moment(vaccineAppointmentById?.dateScheduled).format(
                    "DD-MMM-YYYY"
                  ) || ""
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Time Scheduled"}
                value={vaccineAppointmentById?.timeScheduled || ""}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingVaccineAppointment}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateVaccinationAppointment;
