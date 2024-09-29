import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";

import CustomModal from "../../components/modal";
import { FormWrapper } from "../../components/wrapper";
import Heading from "../../components/heading";
import CustomSelect from "../../components/customSelect";
import { FormActionButton } from "../../components/button";
import Loading from "../../components/loading";

import {
  checkStringValidity,
  checkContactValidity,
  DISTRICT_LIST,
  STATUS_LIST,
} from "../../utils";

import { updateGovOfficersInCharge } from "../../store/actions";

const UpdateGovOfficerInCharge = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const [officerId, setOfficerId] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [isValidDesignation, setIsValidDesignation] = useState(true);
  const [district, setDistrict] = useState("");
  const [isValidDistrict, setIsValidDistrict] = useState(true);
  const [isClearDistrict, setIsClearDistrict] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [assignedUsername, setAssignedUsername] = useState("");
  const [isValidAssignedUsername, setIsValidAssignedUsername] = useState(true);
  const [status, setStatus] = useState("");
  const [isValidStatus, setIsValidStatus] = useState(true);
  const [isClearStatus, setIsClearStatus] = useState(false);

  const {
    isUpdatingGovOfficerInCharge,
    govOfficerInChargeById,
    isGettingGovOfficerInChargeById,
  } = useSelector((state) => state.covidPatient);

  useEffect(() => {
    if (govOfficerInChargeById) {
      setOfficerId(govOfficerInChargeById?.localGovernmentInChargeId);
      setName(govOfficerInChargeById?.localGovernmentInChargeName);
      setDesignation(govOfficerInChargeById?.designation);
      setDistrict(govOfficerInChargeById?.assignedDistrict);
      setPhoneNumber(govOfficerInChargeById?.phoneNumber);
      setAssignedUsername(govOfficerInChargeById?.assignedUsername);
      setStatus(govOfficerInChargeById?.isActive ? "Active" : "Inactive");
      setIsValidDesignation(true);
      setIsValidDistrict(true);
      setIsClearDistrict(true);
      setIsValidPhoneNumber(true);
      setIsValidAssignedUsername(true);
      setIsValidStatus(true);
      setIsClearStatus(true);
    }
  }, [govOfficerInChargeById]);

  const onHandleDesignation = (e) => {
    setIsValidDesignation(true);
    setDesignation(e.target.value);
  };

  const onHandleDistrict = (e) => {
    setIsValidDistrict(true);
    setIsClearDistrict(true);
    setDistrict(e.target.value);
  };

  const onHandleClearDistrict = () => {
    setDistrict("");
    setIsClearDistrict(false);
  };

  const onHandlePhoneNumber = (e) => {
    setIsValidPhoneNumber(true);
    setPhoneNumber(e.target.value);
  };

  const onHandleAssignedUsername = (e) => {
    setIsValidAssignedUsername(true);
    setAssignedUsername(e.target.value);
  };

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

    if (!checkStringValidity(designation)) {
      setIsValidDesignation(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(district)) {
      setIsValidDistrict(false);
      isErrorValidation = true;
    }
    if (!checkContactValidity(phoneNumber)) {
      setIsValidPhoneNumber(false);
      isErrorValidation = true;
    }
    if (!checkStringValidity(assignedUsername)) {
      setIsValidAssignedUsername(false);
      isErrorValidation = true;
    }

    if (!isErrorValidation) {
      handleUpdate(e);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      localGovernmentInChargeId: officerId,
      localGovernmentInChargeName: name,
      designation,
      assignedDistrict: district,
      phoneNumber,
      assignedUsername,
      isActive: status === "Active" ? true : false,
      createdDate: govOfficerInChargeById?.createdDate,
      createdBy: govOfficerInChargeById?.createdBy,
    };

    dispatch(updateGovOfficersInCharge(userData, handleClose));
  };

  const onHandleCancel = () => {
    handleClose();
  };

  return (
    <CustomModal isOpen={isOpen} handleClose={handleClose}>
      {isGettingGovOfficerInChargeById ? (
        <Loading />
      ) : (
        <FormWrapper onSubmit={checkValidity}>
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12}>
              <Heading title={"Update Government Officer In Charge"} />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                disabled
                fullWidth
                label={"Government Officer In Charge Name"}
                value={name}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item sm={12} xs={12}>
              <TextField
                required
                fullWidth
                label={"Designation"}
                placeholder={"Enter Designation"}
                inputProps={{ maxLength: 100 }}
                value={designation || ""}
                onChange={onHandleDesignation}
                error={!isValidDesignation}
                helperText={!isValidDesignation && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"District *"}
                isShowPlaceholder
                value={district || ""}
                selectData={DISTRICT_LIST}
                onChange={onHandleDistrict}
                isValid={isValidDistrict}
                handleClear={onHandleClearDistrict}
                isClear={isClearDistrict}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Phone Number"}
                placeholder={"Enter Phone Number"}
                inputProps={{ maxLength: 50 }}
                value={phoneNumber || ""}
                onChange={onHandlePhoneNumber}
                error={!isValidPhoneNumber}
                helperText={
                  !isValidPhoneNumber
                    ? phoneNumber
                      ? "Please enter a valid Phone number"
                      : "* Required Field"
                    : ""
                }
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <TextField
                required
                fullWidth
                label={"Assigned Username"}
                placeholder={"Enter Assigned Username"}
                inputProps={{ maxLength: 100 }}
                value={assignedUsername || ""}
                onChange={onHandleAssignedUsername}
                error={!isValidAssignedUsername}
                helperText={!isValidAssignedUsername && "* Required Field"}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <CustomSelect
                fullWidth
                label={"Status *"}
                isShowPlaceholder
                value={status || ""}
                selectData={STATUS_LIST}
                onChange={onHandleStatus}
                isValid={isValidStatus}
                handleClear={onHandleClearStatus}
                isClear={isClearStatus}
              />
            </Grid>
          </Grid>
          <FormActionButton
            Edit
            onCancelClick={onHandleCancel}
            loading={isUpdatingGovOfficerInCharge}
          />
        </FormWrapper>
      )}
    </CustomModal>
  );
};

export default UpdateGovOfficerInCharge;
