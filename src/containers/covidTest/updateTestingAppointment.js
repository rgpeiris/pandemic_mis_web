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

import { updateTestsAppointment } from "../../store/actions";

const UpdateTestingAppointment = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const {
    isUpdatingTestsAppointment,
    isGettingTestsAppointmentById,
    testsAppointmentById,
  } = useSelector((state) => state.covidTest);

  useEffect(() => {
    if (testsAppointmentById) {
      setStatus(testsAppointmentById?.status);
      setIsValidStatus(true);
      setIsClearStatus(true);
    }
  }, [testsAppointmentById]);

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
      testsAppointmentId: testsAppointmentById?.testsAppointmentId,
      name: testsAppointmentById?.name,
      nicNumber: testsAppointmentById?.nicNumber,
      age: testsAppointmentById?.age,
      gender: testsAppointmentById?.gender,
      address: testsAppointmentById?.address,
      phoneNumber: testsAppointmentById?.phoneNumber,
      testCentreId: testsAppointmentById?.testCentreId,
      dateScheduled: testsAppointmentById?.dateScheduled,
      timeScheduled: testsAppointmentById?.timeScheduled,
      status,
      createdBy: testsAppointmentById?.createdBy,
      createdDate: testsAppointmentById?.createdDate,
    };

    dispatch(updateTestsAppointment(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingTestsAppointmentById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Testing Appointment"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Name"}
                value={testsAppointmentById?.name || ""}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"NIC Number"}
                value={testsAppointmentById?.nicNumber || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Age"}
                value={testsAppointmentById?.age || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Gender"}
                value={testsAppointmentById?.gender || ""}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Phone Number"}
                value={testsAppointmentById?.phoneNumber || ""}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Address"}
                value={testsAppointmentById?.address || ""}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Testing Center Name"}
                value={testsAppointmentById?.centreName || ""}
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
                  moment(testsAppointmentById?.dateScheduled).format(
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
                value={testsAppointmentById?.timeScheduled || ""}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingTestsAppointment}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateTestingAppointment;
