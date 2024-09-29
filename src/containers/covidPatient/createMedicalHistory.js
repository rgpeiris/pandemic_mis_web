import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import { FormActionButton } from "../../components/button";

import { checkStringValidity } from "../../utils";

import { createMedicalHistory } from "../../store/actions";

const CreateMedicalHistory = ({ isOpen, patientId, handleClose }) => {
  const dispatch = useDispatch();

  const [examinedDate, setExaminedDate] = useState("");
  const [isValidExaminedDate, setIsValidExaminedDate] = useState(true);
  const [diagnosisSummary, setDiagnosisSummary] = useState("");
  const [isValidDiagnosisSummary, setIsValidDiagnosisSummary] = useState(true);
  const [treatments, setTreatments] = useState("");
  const [isValidTreatments, setIsValidTreatments] = useState(true);
  const [remarks, setRemarks] = useState("");
  const [isValidRemarks, setIsValidRemarks] = useState(true);

  const { loggedInUser } = useSelector((state) => state.auth);

  const onHandleExaminedDate = (e) => {
    setIsValidExaminedDate(true);
    setExaminedDate(e.target.value);
  };

  const onHandleDiagnosisSummary = (e) => {
    setIsValidDiagnosisSummary(true);
    setDiagnosisSummary(e.target.value);
  };

  const onHandleTreatments = (e) => {
    setIsValidTreatments(true);
    setTreatments(e.target.value);
  };

  const onHandleRemarks = (e) => {
    setIsValidRemarks(true);
    setRemarks(e.target.value);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(diagnosisSummary)) {
      setIsValidDiagnosisSummary(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(treatments)) {
      setIsValidTreatments(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(remarks)) {
      setIsValidRemarks(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(examinedDate)) {
      setIsValidExaminedDate(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const userData = {
      patientMedicalHistoryId: 0,
      patientId,
      examinedDate,
      examinedBy: loggedInUser.userName,
      diagnosisSummary,
      treatments,
      remarks,
    };

    dispatch(createMedicalHistory(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create Medical History"} />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Diagnosis Summary"}
              placeholder={"Enter Diagnosis Summary"}
              inputProps={{ maxLength: 200 }}
              value={diagnosisSummary}
              multiline
              rows={3}
              onChange={onHandleDiagnosisSummary}
              error={!isValidDiagnosisSummary}
              helperText={!isValidDiagnosisSummary && "* Required Field"}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Treatments"}
              placeholder={"Enter Treatments"}
              inputProps={{ maxLength: 200 }}
              value={treatments}
              multiline
              rows={3}
              onChange={onHandleTreatments}
              error={!isValidTreatments}
              helperText={!isValidTreatments && "* Required Field"}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Remarks"}
              placeholder={"Enter Remarks"}
              inputProps={{ maxLength: 200 }}
              value={remarks}
              multiline
              rows={3}
              onChange={onHandleRemarks}
              error={!isValidRemarks}
              helperText={!isValidRemarks && "* Required Field"}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              required
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              label={"Examined Date"}
              placeholder={"Enter Examined Date"}
              inputProps={{ maxLength: 50 }}
              value={examinedDate}
              onChange={onHandleExaminedDate}
              error={!isValidExaminedDate}
              helperText={!isValidExaminedDate && "* Required Field"}
            />
          </Grid>
        </Grid>
        <FormActionButton onCancelClick={onHandleCancel} loading={false} />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateMedicalHistory;
