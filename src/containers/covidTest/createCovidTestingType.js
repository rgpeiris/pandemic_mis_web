import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import { FormActionButton } from "../../components/button";

import { checkStringValidity } from "../../utils";

import { createTesting } from "../../store/actions";

const CreateCovidTestingType = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [testingType, setTestingType] = useState("");
  const [isValidTestingType, setIsValidTestingType] = useState(true);
  const [description, setDescription] = useState("");
  const [isValidDescription, setIsValidDescription] = useState(true);

  const { loggedInUser } = useSelector((state) => state.auth);
  const { isCreatingTesting } = useSelector((state) => state.covidTest);

  const onHandleTestingType = (e) => {
    setIsValidTestingType(true);
    setTestingType(e.target.value);
  };

  const onHandleDescription = (e) => {
    setIsValidDescription(true);
    setDescription(e.target.value);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(testingType)) {
      setIsValidTestingType(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(description)) {
      setIsValidDescription(false);
      isErrorValidation = true;
    }

    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const userData = {
      pandemicTestId: 0,
      testType: testingType,
      description,
      createdDate: new Date().toISOString(),
      createdBy: loggedInUser.userName,
    };

    dispatch(createTesting(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Heading title={"Create COVID Testing Type"} />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Testing Type"}
              placeholder={"Enter Testing Type"}
              inputProps={{ maxLength: 50 }}
              value={testingType}
              onChange={onHandleTestingType}
              error={!isValidTestingType}
              helperText={!isValidTestingType && "* Required Field"}
            />
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Description"}
              placeholder={"Enter Description"}
              inputProps={{ maxLength: 400 }}
              value={description}
              multiline
              rows={5}
              onChange={onHandleDescription}
              error={!isValidDescription}
              helperText={!isValidDescription && "* Required Field"}
            />
          </Grid>
        </Grid>
        <FormActionButton
          onCancelClick={onHandleCancel}
          loading={isCreatingTesting}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default CreateCovidTestingType;
