import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import { checkStringValidity } from "../../utils";

import { updateTesting } from "../../store/actions";

const UpdateCovidTestingType = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [pandemicTestId, setPandemicTestId] = useState("");
  const [testingType, setTestingType] = useState("");
  const [isValidTestingType, setIsValidTestingType] = useState(true);
  const [description, setDescription] = useState("");
  const [isValidDescription, setIsValidDescription] = useState(true);

  const { isUpdatingTesting, isGettingTestingById, covidTestingById } =
    useSelector((state) => state.covidTest);

  useEffect(() => {
    if (covidTestingById) {
      setPandemicTestId(covidTestingById?.pandemicTestId);
      setTestingType(covidTestingById?.testType);
      setDescription(covidTestingById?.description);
      setIsValidTestingType(true);
      setIsValidDescription(true);
    }
  }, [covidTestingById]);

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
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      pandemicTestId,
      testType: testingType,
      description,
      createdDate: covidTestingById?.createdDate,
      createdBy: covidTestingById?.createdBy,
    };

    dispatch(updateTesting(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingTestingById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update COVID Testing Type"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Testing Type"}
                placeholder={"Enter Testing Type"}
                inputProps={{ maxLength: 50 }}
                value={testingType || ""}
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
                value={description || ""}
                multiline
                rows={5}
                onChange={onHandleDescription}
                error={!isValidDescription}
                helperText={!isValidDescription && "* Required Field"}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingTesting}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateCovidTestingType;
