import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Typography } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import { FormActionButton } from "../../components/button";

import { checkStringValidity } from "../../utils";

const EnterOrganizationRefId = ({ isOpen, handleClose }) => {
  const navigate = useNavigate();

  const [organizationId, setOrganizationId] = useState("");
  const [isValidOrganizationId, setIsValidOrganizationId] = useState(true);

  const { isGettingPandemicContactsByOrgId } = useSelector(
    (state) => state.covidContact
  );

  const onHandleOrganizationId = (e) => {
    setIsValidOrganizationId(true);
    setOrganizationId(e.target.value);
  };

  const checkValidity = (e) => {
    e.preventDefault();
    let isErrorValidation = false;

    if (!checkStringValidity(organizationId)) {
      setIsValidOrganizationId(false);
      isErrorValidation = true;
    }
    if (!isErrorValidation) {
      handleCreate(e);
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    navigate(`/trace-organization-contacts/${organizationId}`);
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      <FormWrapper onSubmit={checkValidity}>
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12}>
            <Typography gutterBottom variant="h5" component="div">
              Track Your Customers
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By registering with "Aarogya", you will be fulfilling your duty as
              a Corporate Citizen and also benefit by doing so in more ways than
              one. Aarogya will help to avoid unnecessary problems by sharing
              your customers' personal information. "Aarogya" will keep you and
              your customers' personal data safe.
            </Typography>
          </Grid>
          <Grid item sm={12} xs={12}>
            <TextField
              required
              fullWidth
              label={"Enter Your Organization Reference Number"}
              placeholder={"Enter Organization Reference Number"}
              inputProps={{ maxLength: 100 }}
              value={organizationId}
              onChange={onHandleOrganizationId}
              error={!isValidOrganizationId}
              helperText={!isValidOrganizationId && "* Required Field"}
            />
          </Grid>
        </Grid>
        <FormActionButton
          title={"Proceed"}
          onCancelClick={onHandleCancel}
          loading={isGettingPandemicContactsByOrgId}
        />
      </FormWrapper>
    </CustomModal>
  );
};

export default EnterOrganizationRefId;
